import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { AssignPicService } from '../../application/commands/assign-pic/assign-pic-work-program.service';
import { AssignPicCommand } from '../../application/commands/assign-pic/assign-pic-work-program.command';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

import { IsNotEmpty, IsString } from 'class-validator';

export class AssignPicRequest {
  @IsString()
  @IsNotEmpty()
  picId: string;
}

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.KADIV, Role.ADMIN)
export class AssignPicController {
  constructor(private readonly service: AssignPicService) {}

  @Patch(':id/assign-pic')
  @HttpCode(HttpStatus.OK)
  async assignPic(@Param('id') id: string, @Body() body: AssignPicRequest) {
    await this.service.execute(new AssignPicCommand(id, body.picId));
    return { message: 'PIC assigned' };
  }
}
