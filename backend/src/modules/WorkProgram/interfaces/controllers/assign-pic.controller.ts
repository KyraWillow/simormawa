import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { AssignPicService } from '../../application/commands/assign-pic/assign-pic-work-program.service';
import { AssignPicCommand } from '../../application/commands/assign-pic/assign-pic-work-program.command';

export class AssignPicRequest {
  picId: string;
}

@Controller('work-programs')
export class AssignPicController {
  constructor(private readonly service: AssignPicService) {}

  @Patch(':id/assign-pic')
  @HttpCode(HttpStatus.OK)
  async assignPic(@Param('id') id: string, @Body() body: AssignPicRequest) {
    await this.service.execute(new AssignPicCommand(id, body.picId));
    return { message: 'PIC assigned' };
  }
}
