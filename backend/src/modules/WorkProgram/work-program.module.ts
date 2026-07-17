import { Module } from '@nestjs/common';
import { WorkProgramRepository } from './application/ports/work-program.repository.port';
import { WorkProgramRepositoryImpl } from './infrastructure/work-program.repository';
import { WorkProgramMapper } from './infrastructure/work-program.mapper';
import { CreateWorkProgramService } from './application/commands/create-work-program/create-work-program.service';
import { UpdateWorkProgramService } from './application/commands/update-work-program/update-work-program.service';
import { UpdateStatusWorkProgramService } from './application/commands/update-status-work-program/update-status-work-program.service';
import { DeleteWorkProgramService } from './application/commands/delete-work-program/delete-work-program.service';
import { AssignPicService } from './application/commands/assign-pic/assign-pic-work-program.service';
import { FindListWorkProgramHandler } from './application/queries/find-list/find-list-work-program.handler';
import { FindByIdWorkProgramHandler } from './application/queries/find-by-id/find-by-id-work-program.handler';
import { DashboardWorkProgramHandler } from './application/queries/dashboard/dashboard-work-program.handler';
import { CreateWorkProgramController } from './interfaces/controllers/create-work-program.controller';
import { UpdateWorkProgramController } from './interfaces/controllers/update-work-program.controller';
import { UpdateStatusWorkProgramController } from './interfaces/controllers/update-status-work-program.controller';
import { DeleteWorkProgramController } from './interfaces/controllers/delete-work-program.controller';
import { AssignPicController } from './interfaces/controllers/assign-pic.controller';
import { FindWorkProgramListController } from './interfaces/controllers/find-work-program-list.controller';
import { FindWorkProgramByIdController } from './interfaces/controllers/find-work-program-by-id.controller';
import { DashboardWorkProgramController } from './interfaces/controllers/dashboard-work-program.controller';
import { LpjController } from './interfaces/controllers/lpj.controller';
import { LpjHandler } from './application/queries/lpj/lpj.handler';

@Module({
  controllers: [
    CreateWorkProgramController,
    UpdateWorkProgramController,
    UpdateStatusWorkProgramController,
    DeleteWorkProgramController,
    AssignPicController,
    DashboardWorkProgramController,
    FindWorkProgramListController,
    FindWorkProgramByIdController,
    LpjController,
  ],
  providers: [
    CreateWorkProgramService,
    UpdateWorkProgramService,
    UpdateStatusWorkProgramService,
    DeleteWorkProgramService,
    AssignPicService,
    FindListWorkProgramHandler,
    FindByIdWorkProgramHandler,
    DashboardWorkProgramHandler,
    LpjHandler,
    WorkProgramMapper,
    { provide: WorkProgramRepository, useClass: WorkProgramRepositoryImpl },
  ],
  exports: [WorkProgramRepository],
})
export class WorkProgramModule {}
