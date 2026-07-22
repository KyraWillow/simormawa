import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/infrastructure/roles.guard';
import { Roles } from '../../../auth/infrastructure/roles.decorator';
import { Role } from '../../../user/domain/user.entity';
import { ExportService } from '../../application/services/export.service';
import type { Response } from 'express';

@Controller('export')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('lpj/:id/pdf')
  @Roles(Role.SEKRETARIS, Role.BENDAHARA, Role.ADMIN)
  async exportLpjPdf(@Param('id') id: string, @Res() res: Response) {
    const file = await this.exportService.exportLpjPdf(id);
    res.set(file.getHeaders());
    file.getStream().pipe(res);
  }

  @Get('evaluations/xlsx')
  @Roles(Role.BPH, Role.ADMIN)
  async exportEvaluations(@Res() res: Response) {
    const file = await this.exportService.exportEvaluationsXlsx();
    res.set(file.getHeaders());
    file.getStream().pipe(res);
  }

  @Get('work-programs/xlsx')
  @Roles(Role.ADMIN)
  async exportWorkPrograms(@Res() res: Response) {
    const file = await this.exportService.exportWorkProgramsXlsx();
    res.set(file.getHeaders());
    file.getStream().pipe(res);
  }

  @Get('budgets/xlsx')
  @Roles(Role.BENDAHARA, Role.ADMIN)
  async exportBudgets(@Res() res: Response) {
    const file = await this.exportService.exportBudgetsXlsx();
    res.set(file.getHeaders());
    file.getStream().pipe(res);
  }
}
