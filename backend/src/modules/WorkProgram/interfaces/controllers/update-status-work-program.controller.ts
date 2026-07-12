import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UpdateStatusWorkProgramService } from '../../application/commands/update-status-work-program/update-status-work-program.service';
import { UpdateStatusWorkProgramCommand } from '../../application/commands/update-status-work-program/update-status-work-program.command';
import { WorkProgramStatus } from '../../domain/work-program.entity';

export class UpdateStatusRequest {
  @IsEnum(WorkProgramStatus)
  @IsNotEmpty()
  status: WorkProgramStatus;
}

@Controller('work-programs')
export class UpdateStatusWorkProgramController {
  constructor(private readonly service: UpdateStatusWorkProgramService) {}

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusRequest) {
    await this.service.execute(new UpdateStatusWorkProgramCommand(id, body.status));
    return { message: 'Status updated' };
  }
}
