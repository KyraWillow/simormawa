import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { WorkProgramRepository } from '../../ports/work-program.repository.port';
import { WorkProgramEntity } from '../../../domain/work-program.entity';
import { CreateWorkProgramCommand } from './create-work-program.command';

@Injectable()
export class CreateWorkProgramService {
  constructor(private readonly workProgramRepo: WorkProgramRepository) {}

  async execute(command: CreateWorkProgramCommand): Promise<string> {
    const id = randomUUID();
    const workProgram = WorkProgramEntity.create(id, command.name, command.description, command.picId, command.deadline);
    await this.workProgramRepo.save(workProgram);
    return id;
  }
}
