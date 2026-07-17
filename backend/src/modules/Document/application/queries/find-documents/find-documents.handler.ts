import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../../ports/document.repository.port';
import { FindDocumentsQuery } from './find-documents.query';

@Injectable()
export class FindDocumentsHandler {
  constructor(private readonly repo: DocumentRepository) {}
  async execute(q: FindDocumentsQuery) {
    return this.repo.findByWorkProgramId(q.workProgramId);
  }
}
