import { Injectable } from '@nestjs/common';
import { WorkProgramRepository } from '../../ports/work-program.repository.port';
import { WorkProgramNotFoundError } from '../../../domain/work-program.errors';
import { UpdateStatusWorkProgramCommand } from './update-status-work-program.command';

@Injectable()
export class UpdateStatusWorkProgramService {
  constructor(private readonly workProgramRepo: WorkProgramRepository) {}

  async execute(command: UpdateStatusWorkProgramCommand): Promise<void> {
    const workProgram = await this.workProgramRepo.findById(command.id);

    if (!workProgram) {
      throw new WorkProgramNotFoundError(command.id);
    }

    workProgram.updateStatus(command.status);
    await this.workProgramRepo.save(workProgram);
  }
}
