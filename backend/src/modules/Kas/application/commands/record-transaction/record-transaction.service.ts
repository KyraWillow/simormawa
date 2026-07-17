import { Injectable } from '@nestjs/common';
import { KasRepository } from '../../ports/kas.repository.port';
import { RecordTransactionCommand } from './record-transaction.command';
import { KasNotFoundError, InsufficientBalanceError } from '../../../domain/kas.errors';
import { TransactionType } from '../../../domain/kas.entity';

@Injectable()
export class RecordTransactionService {
  constructor(private readonly repo: KasRepository) {}

  async execute(cmd: RecordTransactionCommand): Promise<{ balance: number }> {
    const kas = await this.repo.find();
    if (!kas) throw new KasNotFoundError();

    try {
      kas.recordTransaction(cmd.type, cmd.amount, cmd.description, cmd.createdBy, cmd.budgetId);
    } catch (e: any) {
      if (e.message === 'Insufficient balance') throw new InsufficientBalanceError();
      throw e;
    }

    await this.repo.save(kas);
    return { balance: kas.balance };
  }
}
