import { WorkProgramStatus } from '../../domain/work-program.entity';

export class WorkProgramResponseDto {
  id: string;
  name: string;
  description: string;
  status: WorkProgramStatus;
  picId: string;
  deadline: Date;

  constructor(data: {
    id: string;
    name: string;
    description: string;
    status: WorkProgramStatus;
    picId: string;
    deadline: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.picId = data.picId;
    this.deadline = data.deadline;
  }
}
