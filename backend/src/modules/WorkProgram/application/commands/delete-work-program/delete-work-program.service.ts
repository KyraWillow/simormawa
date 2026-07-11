import { Injectable } from '@nestjs/common';
import { WorkProgramRepository } from '../../ports/work-program.repository.port';
import { WorkProgramNotFoundError } from '../../../domain/work-program.errors';
import { DeleteWorkProgramCommand } from './delete-work-program.command';
import { WorkProgramStatus } from '../../../domain/work-program.entity';

@Injectable()
export class DeleteWorkProgramService {
  constructor(private readonly workProgramRepo: WorkProgramRepository) {}

  async execute(command: DeleteWorkProgramCommand): Promise<void> {
    const workProgram = await this.workProgramRepo.findById(command.id);

    if (!workProgram) {
      throw new WorkProgramNotFoundError(command.id);
    }

    if (workProgram.status === WorkProgramStatus.COMPLETED) {
      throw new Error('Cannot delete a completed work program');
    }

    await this.workProgramRepo.delete(command.id);
  }
}
