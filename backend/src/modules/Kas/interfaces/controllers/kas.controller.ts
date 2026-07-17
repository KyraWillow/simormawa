import { Body, Controller, Get, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { RecordTransactionService } from '../../application/commands/record-transaction/record-transaction.service';
import { RecordTransactionCommand } from '../../application/commands/record-transaction/record-transaction.command';
import { FindKasHandler } from '../../application/queries/find-kas/find-kas.handler';
import { FindKasQuery } from '../../application/queries/find-kas/find-kas.query';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('kas')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.BENDAHARA)
export class KasController {
  constructor(
    private readonly recordSvc: RecordTransactionService,
    private readonly findKasH: FindKasHandler,
  ) {}

  @Get()
  async findKas() {
    const kas = await this.findKasH.execute(new FindKasQuery());
    return { id: kas.id, balance: kas.balance, transactions: kas.transactions };
  }

  @Patch('transaction')
  @HttpCode(HttpStatus.OK)
  async record(@Body() body: any) {
    const result = await this.recordSvc.execute(
      new RecordTransactionCommand(body.type, body.amount, body.description, body.createdBy, body.budgetId),
    );
    return { balance: result.balance, message: 'Transaksi berhasil' };
  }
}
