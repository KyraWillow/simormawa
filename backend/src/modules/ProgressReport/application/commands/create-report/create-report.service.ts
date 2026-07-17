import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProgressReportRepository } from '../../ports/progress-report.repository.port';
import { ProgressReportEntity } from '../../../domain/progress-report.entity';
import { CreateReportCommand } from './create-report.command';

@Injectable()
export class CreateReportService {
  constructor(private readonly repo: ProgressReportRepository) {}
  async execute(cmd: CreateReportCommand): Promise<string> {
    const id = randomUUID();
    const entity = ProgressReportEntity.create(id, cmd.workProgramId, cmd.submittedBy, cmd.progressPct, cmd.description, cmd.obstacles);
    await this.repo.save(entity);
    return id;
  }
}
