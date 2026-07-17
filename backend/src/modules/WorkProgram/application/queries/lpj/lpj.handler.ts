import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LpjHandler {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: any,
  ) {}

  async execute(workProgramId: string): Promise<any> {
    const [wp] = await this.pool.query(
      `SELECT wp.*, u.name as pic_name, u.email as pic_email
       FROM work_programs wp JOIN users u ON u.id = wp.pic_id
       WHERE wp.id = ?`,
      [workProgramId],
    );
    if (!wp) throw new Error('Work program not found');

    const budgets = await this.pool.query(
      `SELECT b.*, GROUP_CONCAT(
        JSON_OBJECT('item_name', bi.item_name, 'quantity', bi.quantity, 'unit', bi.unit, 'unit_price', bi.unit_price, 'total_price', bi.total_price)
      ) as items_json
      FROM budgets b LEFT JOIN budget_items bi ON bi.budget_id = b.id
      WHERE b.work_program_id = ? AND b.status IN ('approved','submitted')
      GROUP BY b.id`,
      [workProgramId],
    );

    const budgetItems: any[] = [];
    let totalAnggaran = 0;
    for (const b of budgets) {
      const items = b.items_json ? Object.values(JSON.parse(`[${b.items_json}]`.replace(/}{/g, '},{'))) : [];
      budgetItems.push(...items.map((i: any) => ({ ...i, budgetStatus: b.status })));
      if (b.status === 'approved') totalAnggaran += Number(b.total_amount);
    }

    const kasTx = await this.pool.query(
      `SELECT kt.*, b.name as work_program_name
       FROM kas_transactions kt
       LEFT JOIN budgets b ON b.id = kt.budget_id
       WHERE kt.budget_id IN (SELECT id FROM budgets WHERE work_program_id = ?)`,
      [workProgramId],
    );

    const totalRealisasi = kasTx.reduce((sum: number, tx: any) => sum + Number(tx.amount), 0);

    const progressReports = await this.pool.query(
      `SELECT * FROM progress_reports WHERE work_program_id = ? ORDER BY submitted_at DESC`,
      [workProgramId],
    );

    return {
      workProgram: {
        id: wp.id,
        name: wp.name,
        description: wp.description,
        status: wp.status,
        picName: wp.pic_name,
        picEmail: wp.pic_email,
        deadline: wp.deadline,
      },
      anggaran: {
        items: budgetItems,
        totalAnggaran,
        totalRealisasi,
        selisih: totalAnggaran - totalRealisasi,
      },
      kasTransactions: kasTx.map((tx: any) => ({
        type: tx.type,
        amount: tx.amount,
        description: tx.description,
        date: tx.transaction_date,
      })),
      progressReports: progressReports.map((pr: any) => ({
        progressPct: pr.progress_pct,
        description: pr.description,
        obstacles: pr.obstacles,
        submittedAt: pr.submitted_at,
      })),
    };
  }
}
