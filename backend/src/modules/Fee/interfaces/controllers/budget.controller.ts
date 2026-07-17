import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateBudgetService } from '../../application/commands/create-budget/create-budget.service';
import { CreateBudgetRequestDto } from '../dtos/create-budget.request.dto';
import { CreateBudgetCommand } from '../../application/commands/create-budget/create-budget.command';
import { SubmitBudgetService } from '../../application/commands/submit-budget/submit-budget.service';
import { SubmitBudgetCommand } from '../../application/commands/submit-budget/submit-budget.command';
import { ApproveBudgetService } from '../../application/commands/approve-budget/approve-budget.service';
import { ApproveBudgetCommand } from '../../application/commands/approve-budget/approve-budget.command';
import { FindBudgetListHandler } from '../../application/queries/find-budget-list/find-budget-list.handler';
import { FindBudgetListQuery } from '../../application/queries/find-budget-list/find-budget-list.query';
import { FindBudgetByIdHandler } from '../../application/queries/find-budget-by-id/find-budget-by-id.handler';
import { FindBudgetByIdQuery } from '../../application/queries/find-budget-by-id/find-budget-by-id.query';
import { BudgetDashboardHandler } from '../../application/queries/budget-dashboard/budget-dashboard.handler';
import { BudgetDashboardQuery } from '../../application/queries/budget-dashboard/budget-dashboard.query';
import { BudgetResponseDto } from '../dtos/budget.response.dto';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('budgets')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.BENDAHARA)
export class BudgetController {
  constructor(
    private readonly createSvc: CreateBudgetService,
    private readonly submitSvc: SubmitBudgetService,
    private readonly approveSvc: ApproveBudgetService,
    private readonly listH: FindBudgetListHandler,
    private readonly byIdH: FindBudgetByIdHandler,
    private readonly dashH: BudgetDashboardHandler,
  ) {}

  @Post() @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBudgetRequestDto) {
    const id = await this.createSvc.execute(new CreateBudgetCommand(dto.workProgramId, dto.submittedBy, dto.items));
    return { id };
  }
  @Patch(':id/submit') @HttpCode(HttpStatus.OK)
  async submit(@Param('id') id: string, @Body() body: any) {
    await this.submitSvc.execute(new SubmitBudgetCommand(id, body.notes));
    return { message: 'Budget submitted' };
  }
  @Patch(':id/approve') @HttpCode(HttpStatus.OK)
  async approve(@Param('id') id: string, @Body() body: any) {
    await this.approveSvc.execute(new ApproveBudgetCommand(id, body.action, body.notes));
    return { message: 'Budget ' + body.action };
  }
  @Get() async findAll(@Query('workProgramId') wpId?: string) {
    const items = await this.listH.execute(new FindBudgetListQuery(wpId));
    return items.map((i: any) => new BudgetResponseDto(i));
  }
  @Get('dashboard') async dashboard() {
    return this.dashH.execute(new BudgetDashboardQuery());
  }
  @Get(':id') async findById(@Param('id') id: string) {
    return new BudgetResponseDto(await this.byIdH.execute(new FindBudgetByIdQuery(id)));
  }
}
