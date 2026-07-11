import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateWorkProgramService } from '../../application/commands/create-work-program/create-work-program.service';
import { CreateWorkProgramRequest } from '../dtos/create-work-program.request.dto';
import { CreateWorkProgramCommand } from '../../application/commands/create-work-program/create-work-program.command';

@Controller('work-programs')
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