import { Injectable } from '@nestjs/common';
import { KasRepository } from '../../ports/kas.repository.port';
import { FindKasQuery } from './find-kas.query';
import { KasNotFoundError } from '../../../domain/kas.errors';

@Injectable()
export class FindKasHandler {
  constructor(private readonly repo: KasRepository) {}
  async execute(q: FindKasQuery) {
    const kas = await this.repo.find();
    if (!kas) throw new KasNotFoundError();
    return kas;
  }
}
