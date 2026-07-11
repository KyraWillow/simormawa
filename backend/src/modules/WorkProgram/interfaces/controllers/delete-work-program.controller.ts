import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteWorkProgramService } from '../../application/commands/delete-work-program/delete-work-program.service';
import { DeleteWorkProgramCommand } from '../../application/commands/delete-work-program/delete-work-program.command';

@Controller('work-programs')
export class DeleteWorkProgramController {
  constructor(private readonly service: DeleteWorkProgramService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.service.execute(new DeleteWorkProgramCommand(id));
    return { message: 'Work program deleted' };
  }
}
