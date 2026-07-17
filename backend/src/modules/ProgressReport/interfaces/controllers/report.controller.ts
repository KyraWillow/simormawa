import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CreateReportService } from '../../application/commands/create-report/create-report.service';
import { CreateReportRequestDto } from '../dtos/create-report.request.dto';
import { CreateReportCommand } from '../../application/commands/create-report/create-report.command';
import { FindReportListHandler } from '../../application/queries/find-report-list/find-report-list.handler';
import { FindReportListQuery } from '../../application/queries/find-report-list/find-report-list.query';
import { FindReportByWorkProgramHandler } from '../../application/queries/find-report-by-work-program/find-report-by-work-program.handler';
import { FindReportByWorkProgramQuery } from '../../application/queries/find-report-by-work-program/find-report-by-work-program.query';
import { ReportResponseDto } from '../dtos/report.response.dto';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('progress-reports')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.PIC_STAFF)
export class ReportController {
  constructor(
    private readonly createSvc: CreateReportService,
    private readonly listH: FindReportListHandler,
    private readonly wpH: FindReportByWorkProgramHandler,
  ) {}

  @Post() @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateReportRequestDto) {
    const id = await this.createSvc.execute(new CreateReportCommand(dto.workProgramId, dto.submittedBy, dto.progressPct, dto.description, dto.obstacles));
    return { id };
  }

  @Get() async findAll() {
    const items = await this.listH.execute(new FindReportListQuery());
    return items.map((i: any) => new ReportResponseDto(i));
  }

  @Get('by-work-program/:wpId') async findByWp(@Param('wpId') wpId: string) {
    const items = await this.wpH.execute(new FindReportByWorkProgramQuery(wpId));
    return items.map((i: any) => new ReportResponseDto(i));
  }
}
