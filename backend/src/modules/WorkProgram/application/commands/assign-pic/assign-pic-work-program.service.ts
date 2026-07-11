import { Injectable } from '@nestjs/common';
import { WorkProgramRepository } from '../../ports/work-program.repository.port';
import { WorkProgramNotFoundError } from '../../../domain/work-program.errors';
import { AssignPicCommand } from './assign-pic-work-program.command';

@Injectable()
export class AssignPicService {
  constructor(private readonly workProgramRepo: WorkProgramRepository) {}

  async execute(command: AssignPicCommand): Promise<void> {
    const workProgram = await this.workProgramRepo.findById(command.id);

    if (!workProgram) {
      throw new WorkProgramNotFoundError(command.id);
    }

    workProgram.assignPIC(command.picId);
    await this.workProgramRepo.save(workProgram);
  }
}
