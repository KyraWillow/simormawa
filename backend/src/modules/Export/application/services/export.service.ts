import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly pool: any) {}

  async exportLpjPdf(workProgramId: string): Promise<StreamableFile> {
    const [wp] = await this.pool.query(
      `SELECT wp.*, u.name as pic_name FROM work_programs wp JOIN users u ON u.id = wp.pic_id WHERE wp.id = ?`,
      [workProgramId],
    );
    if (!wp) throw new Error('Work program not found');

    const budgets = await this.pool.query(
      `SELECT b.status, b.total_amount, bi.item_name, bi.quantity, bi.unit, bi.unit_price, bi.total_price
       FROM budgets b LEFT JOIN budget_items bi ON bi.budget_id = b.id WHERE b.work_program_id = ? AND b.status IN ('approved','submitted')`,
      [workProgramId],
    );

    const kasTx = await this.pool.query(
      `SELECT kt.* FROM kas_transactions kt
       WHERE kt.budget_id IN (SELECT id FROM budgets WHERE work_program_id = ?)`,
      [workProgramId],
    );

    const doc = new PDFDocument({ margin: 40 });
    const buffers: Buffer[] = [];
    doc.on('data', (chunk) => buffers.push(chunk));

    const rp = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

    doc.fontSize(16).font('Helvetica-Bold').text('LAPORAN PERTANGGUNGJAWABAN', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(wp.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica-Bold').text('Informasi Program Kerja');
    doc.fontSize(9).font('Helvetica').text(`Status: ${wp.status}`);
    doc.text(`PIC: ${wp.pic_name}`);
    doc.text(`Deadline: ${new Date(wp.deadline).toLocaleDateString('id-ID')}`);
    doc.moveDown(0.5);

    doc.fontSize(10).font('Helvetica-Bold').text('Rincian Anggaran');
    doc.fontSize(8).font('Helvetica');
    const tableTop = doc.y;
    let y = tableTop;
    doc.text('Item', 40, y); doc.text('Qty', 200, y); doc.text('Harga', 260, y); doc.text('Total', 350, y);
    y += 15;
    doc.moveTo(40, y).lineTo(430, y).stroke();
    y += 5;

    let totalAnggaran = 0;
    for (const b of budgets) {
      if (b.item_name) {
        doc.text(b.item_name, 40, y, { width: 150 });
        doc.text(String(b.quantity), 200, y, { width: 40 });
        doc.text(rp(b.unit_price), 260, y, { width: 80 });
        doc.text(rp(b.total_price), 350, y, { width: 80 });
        y += 14;
      }
      if (b.total_amount) totalAnggaran = Math.max(totalAnggaran, Number(b.total_amount));
    }
    doc.moveTo(40, y).lineTo(430, y).stroke();
    y += 5;
    doc.font('Helvetica-Bold').text(`Total Anggaran: ${rp(totalAnggaran)}`, 40, y);
    y += 16;

    const totalRealisasi = kasTx.reduce((s: number, t: any) => s + Number(t.amount), 0);
    doc.font('Helvetica').text(`Total Realisasi: ${rp(totalRealisasi)}`, 40, y);
    y += 12;
    doc.font('Helvetica-Bold').text(`Selisih: ${rp(totalAnggaran - totalRealisasi)}`, 40, y);

    doc.end();
    await new Promise((resolve) => doc.on('end', resolve));

    return new StreamableFile(Buffer.concat(buffers), {
      type: 'application/pdf',
      disposition: `attachment; filename="LPJ-${wp.name.replace(/\s+/g, '_')}.pdf"`,
    });
  }

  async exportEvaluationsXlsx(): Promise<StreamableFile> {
    const evaluations = await this.pool.query(
      `SELECT e.*, wp.name as wp_name, u.name as evaluator_name
       FROM evaluations e JOIN work_programs wp ON wp.id = e.work_program_id JOIN users u ON u.id = e.evaluated_by
       ORDER BY e.created_at DESC`,
    );

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Evaluasi');

    sheet.columns = [
      { header: 'Program Kerja', key: 'wp_name', width: 30 },
      { header: 'Evaluator', key: 'evaluator_name', width: 20 },
      { header: 'Kesimpulan', key: 'kesimpulan', width: 40 },
      { header: 'Rekomendasi', key: 'rekomendasi', width: 40 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Tanggal', key: 'created_at', width: 20 },
    ];
    evaluations.forEach((e: any) => sheet.addRow(e));

    const buffer = await workbook.xlsx.writeBuffer();
    return new StreamableFile(Buffer.from(buffer), {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename="evaluasi.xlsx"',
    });
  }

  async exportWorkProgramsXlsx(): Promise<StreamableFile> {
    const data = await this.pool.query(
      `SELECT wp.*, u.name as pic_name FROM work_programs wp JOIN users u ON u.id = wp.pic_id ORDER BY wp.created_at DESC`,
    );

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Program Kerja');

    sheet.columns = [
      { header: 'Nama', key: 'name', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'PIC', key: 'pic_name', width: 20 },
      { header: 'Deadline', key: 'deadline', width: 20 },
    ];
    data.forEach((d: any) => sheet.addRow(d));

    const buffer = await workbook.xlsx.writeBuffer();
    return new StreamableFile(Buffer.from(buffer), {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename="program-kerja.xlsx"',
    });
  }

  async exportBudgetsXlsx(): Promise<StreamableFile> {
    const data = await this.pool.query(
      `SELECT b.*, wp.name as wp_name, u.name as submitter FROM budgets b
       JOIN work_programs wp ON wp.id = b.work_program_id JOIN users u ON u.id = b.submitted_by
       ORDER BY b.created_at DESC`,
    );

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Anggaran');

    sheet.columns = [
      { header: 'Program Kerja', key: 'wp_name', width: 30 },
      { header: 'Pengaju', key: 'submitter', width: 20 },
      { header: 'Total', key: 'total_amount', width: 15 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Tanggal', key: 'created_at', width: 20 },
    ];
    data.forEach((d: any) => {
      d.total_amount = Number(d.total_amount).toLocaleString('id-ID');
      sheet.addRow(d);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return new StreamableFile(Buffer.from(buffer), {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename="anggaran.xlsx"',
    });
  }
}
