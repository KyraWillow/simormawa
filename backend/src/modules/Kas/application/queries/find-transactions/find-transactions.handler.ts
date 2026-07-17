import { Injectable } from '@nestjs/common';
import { KasRepository } from '../../ports/kas.repository.port';
import { FindTransactionsQuery } from './find-transactions.query';

@Injectable()
export class FindTransactionsHandler {
  constructor(private readonly repo: KasRepository) {}
  async execute(q: FindTransactionsQuery) {
    return { transactions: [] };
  }
}
