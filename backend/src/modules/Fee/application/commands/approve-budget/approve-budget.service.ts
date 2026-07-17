import { Inject, Injectable } from '@nestjs/common';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { ApproveBudgetCommand } from './approve-budget.command';
import { BudgetNotFoundError } from '../../../domain/budget.errors';
import { randomUUID } from 'crypto';

@Injectable()
export class ApproveBudgetService {
  constructor(
    private readonly repo: BudgetRepository,
    @Inject('DATABASE_CONNECTION') private readonly pool: any,
  ) {}
  async execute(cmd: ApproveBudgetCommand): Promise<void> {
    const entity = await this.repo.findById(cmd.id);
    if (!entity) throw new BudgetNotFoundError(cmd.id);
    if (cmd.action === 'approved') entity.approve(cmd.notes);
    else entity.reject(cmd.notes);
    await this.repo.save(entity);

    // Send notification to submitter
    const [wpRow] = await this.pool.query(
      'SELECT wp.name FROM budgets b JOIN work_programs wp ON wp.id = b.work_program_id WHERE b.id = ?',
      [cmd.id],
    );
    if (wpRow) {
      const statusText = cmd.action === 'approved' ? 'disetujui' : 'ditolak';
      await this.pool.query(
        `INSERT INTO notifications (id, user_id, type, title, message, link) VALUES (?, ?, 'budget', ?, ?, '/finance')`,
        [randomUUID(), entity.submittedBy, `Anggaran ${statusText}: ${wpRow.name}`, `Anggaran untuk "${wpRow.name}" telah ${statusText}.`],
      );
    }
  }
}
