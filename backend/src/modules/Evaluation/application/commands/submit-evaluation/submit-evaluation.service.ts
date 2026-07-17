import { Inject, Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../ports/evaluation.repository.port';
import { SubmitEvaluationCommand } from './submit-evaluation.command';
import { EvaluationNotFoundError, EvaluationAlreadySubmittedError } from '../../../domain/evaluation.errors';
import { randomUUID } from 'crypto';

@Injectable()
export class SubmitEvaluationService {
  constructor(
    private readonly repo: EvaluationRepository,
    @Inject('DATABASE_CONNECTION') private readonly pool: any,
  ) {}

  async execute(command: SubmitEvaluationCommand): Promise<void> {
    const entity = await this.repo.findById(command.id);
    if (!entity) throw new EvaluationNotFoundError(command.id);
    entity.submit(command.kesimpulan, command.rekomendasi);
    await this.repo.save(entity);

    // Notify BPH users
    const [wpRow] = await this.pool.query(
      'SELECT wp.name FROM evaluations e JOIN work_programs wp ON wp.id = e.work_program_id WHERE e.id = ?',
      [command.id],
    );
    if (wpRow) {
      const bphUsers = await this.pool.query('SELECT id FROM users WHERE role = ?', ['BPH']);
      for (const user of bphUsers) {
        await this.pool.query(
          `INSERT INTO notifications (id, user_id, type, title, message, link) VALUES (?, ?, 'evaluation', ?, ?, '/evaluations')`,
          [randomUUID(), user.id, `Evaluasi baru: ${wpRow.name}`, `Evaluasi untuk program kerja "${wpRow.name}" telah disubmit.`],
        );
      }
    }
  }
}
