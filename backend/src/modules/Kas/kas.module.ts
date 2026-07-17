import { Module } from '@nestjs/common';
import { KasRepository } from './application/ports/kas.repository.port';
import { KasRepositoryImpl } from './infrastructure/kas.repository';
import { KasMapper } from './infrastructure/kas.mapper';
import { RecordTransactionService } from './application/commands/record-transaction/record-transaction.service';
import { FindKasHandler } from './application/queries/find-kas/find-kas.handler';
import { FindTransactionsHandler } from './application/queries/find-transactions/find-transactions.handler';
import { KasController } from './interfaces/controllers/kas.controller';

@Module({
  controllers: [KasController],
  providers: [
    RecordTransactionService, FindKasHandler, FindTransactionsHandler, KasMapper,
    { provide: KasRepository, useClass: KasRepositoryImpl },
  ],
  exports: [KasRepository],
})
export class KasModule {}
