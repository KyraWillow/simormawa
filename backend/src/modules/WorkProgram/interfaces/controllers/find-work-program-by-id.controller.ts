import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdWorkProgramHandler } from '../../application/queries/find-by-id/find-by-id-work-program.handler';
import { FindByIdWorkProgramQuery } from '../../application/queries/find-by-id/find-by-id-work-program.query';
import { WorkProgramResponseDto } from '../dtos/work-program.response.dto';

@Controller('work-programs')
export class FindWorkProgramByIdController {
  constructor(private readonly handler: FindByIdWorkProgramHandler) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const item = await this.handler.execute(new FindByIdWorkProgramQuery(id));
    return new WorkProgramResponseDto(item);
  }
}
