import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateWorkProgramService } from '../../application/commands/create-work-program/create-work-program.service';
import { CreateWorkProgramRequest } from '../dtos/create-work-program.request.dto';
import { CreateWorkProgramCommand } from '../../application/commands/create-work-program/create-work-program.command';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.KADIV, Role.ADMIN)
export class CreateWorkProgramController {
  constructor(private readonly workProgramService: CreateWorkProgramService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateWorkProgramRequest) {
    const id = await this.workProgramService.execute(
      new CreateWorkProgramCommand(dto.name, dto.description, dto.picId, new Date(dto.deadline)),
    );
    return { id };
  }
}