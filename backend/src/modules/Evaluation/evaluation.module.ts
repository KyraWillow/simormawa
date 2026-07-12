import { Module } from '@nestjs/common';
import { EvaluationRepository } from './application/ports/evaluation.repository.port';
import { EvaluationRepositoryImpl } from './infrastructure/evaluation.repository';
import { EvaluationMapper } from './infrastructure/evaluation.mapper';
import { CreateEvaluationService } from './application/commands/create-evaluation/create-evaluation.service';
import { SubmitEvaluationService } from './application/commands/submit-evaluation/submit-evaluation.service';
import { FindEvaluationListHandler } from './application/queries/find-evaluation-list/find-evaluation-list.handler';
import { FindEvaluationByIdHandler } from './application/queries/find-evaluation-by-id/find-evaluation-by-id.handler';
import { EvaluationDashboardHandler } from './application/queries/evaluation-dashboard/evaluation-dashboard.handler';
import { EvaluationController } from './interfaces/controllers/evaluation.controller';

@Module({
  controllers: [EvaluationController],
  providers: [
    CreateEvaluationService,
    SubmitEvaluationService,
    FindEvaluationListHandler,
    FindEvaluationByIdHandler,
    EvaluationDashboardHandler,
    EvaluationMapper,
    { provide: EvaluationRepository, useClass: EvaluationRepositoryImpl },
  ],
  exports: [EvaluationRepository],
})
export class EvaluationModule {}
