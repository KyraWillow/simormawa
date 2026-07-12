import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateEvaluationService } from '../../application/commands/create-evaluation/create-evaluation.service';
import { CreateEvaluationRequestDto } from '../dtos/create-evaluation.request.dto';
import { CreateEvaluationCommand } from '../../application/commands/create-evaluation/create-evaluation.command';
import { SubmitEvaluationService } from '../../application/commands/submit-evaluation/submit-evaluation.service';
import { SubmitEvaluationRequestDto } from '../dtos/submit-evaluation.request.dto';
import { SubmitEvaluationCommand } from '../../application/commands/submit-evaluation/submit-evaluation.command';
import { FindEvaluationListHandler } from '../../application/queries/find-evaluation-list/find-evaluation-list.handler';
import { FindEvaluationListQuery } from '../../application/queries/find-evaluation-list/find-evaluation-list.query';
import { FindEvaluationByIdHandler } from '../../application/queries/find-evaluation-by-id/find-evaluation-by-id.handler';
import { FindEvaluationByIdQuery } from '../../application/queries/find-evaluation-by-id/find-evaluation-by-id.query';
import { EvaluationDashboardHandler } from '../../application/queries/evaluation-dashboard/evaluation-dashboard.handler';
import { EvaluationDashboardQuery } from '../../application/queries/evaluation-dashboard/evaluation-dashboard.query';
import { EvaluationResponseDto } from '../dtos/evaluation.response.dto';

@Controller('evaluations')
export class EvaluationController {
  constructor(
    private readonly createService: CreateEvaluationService,
    private readonly submitService: SubmitEvaluationService,
    private readonly findListHandler: FindEvaluationListHandler,
    private readonly findByIdHandler: FindEvaluationByIdHandler,
    private readonly dashboardHandler: EvaluationDashboardHandler,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateEvaluationRequestDto) {
    const id = await this.createService.execute(
      new CreateEvaluationCommand(dto.workProgramId, dto.evaluatedBy, dto.indicators),
    );
    return { id };
  }

  @Patch(':id/submit')
  @HttpCode(HttpStatus.OK)
  async submit(@Param('id') id: string, @Body() dto: SubmitEvaluationRequestDto) {
    await this.submitService.execute(new SubmitEvaluationCommand(id, dto.kesimpulan, dto.rekomendasi));
    return { message: 'Evaluation submitted' };
  }

  @Get()
  async findAll(@Query('workProgramId') workProgramId?: string) {
    const items = await this.findListHandler.execute(new FindEvaluationListQuery(workProgramId));
    return items.map((i: any) => new EvaluationResponseDto(i));
  }

  @Get('dashboard')
  async dashboard() {
    return this.dashboardHandler.execute(new EvaluationDashboardQuery());
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const item = await this.findByIdHandler.execute(new FindEvaluationByIdQuery(id));
    return new EvaluationResponseDto(item);
  }
}
