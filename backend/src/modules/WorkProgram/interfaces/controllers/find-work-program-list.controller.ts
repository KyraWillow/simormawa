import { Controller, Get } from '@nestjs/common';
import { FindListWorkProgramHandler } from '../../application/queries/find-list/find-list-work-program.handler';
import { FindListWorkProgramQuery } from '../../application/queries/find-list/find-list-work-program.query';
import { WorkProgramResponseDto } from '../dtos/work-program.response.dto';

@Controller('work-programs')
export class FindWorkProgramListController {
  constructor(private readonly handler: FindListWorkProgramHandler) {}

  @Get()
  async findAll() {
    const items = await this.handler.execute(new FindListWorkProgramQuery());
    return items.map((item: any) => new WorkProgramResponseDto(item));
  }
}
