import { WorkProgramStatus } from '../../../domain/work-program.entity';

export class UpdateStatusWorkProgramCommand {
  constructor(
    public readonly id: string,
    public readonly status: WorkProgramStatus,
  ) {}
}
