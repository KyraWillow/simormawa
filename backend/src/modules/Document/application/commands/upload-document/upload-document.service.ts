import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DocumentRepository } from '../../ports/document.repository.port';
import { DocumentEntity } from '../../../domain/document.entity';
import { UploadDocumentCommand } from './upload-document.command';

@Injectable()
export class UploadDocumentService {
  constructor(private readonly repo: DocumentRepository) {}

  async execute(cmd: UploadDocumentCommand): Promise<string> {
    const id = randomUUID();
    const entity = DocumentEntity.create(id, {
      workProgramId: cmd.workProgramId,
      uploadedBy: cmd.uploadedBy,
      type: cmd.type,
      fileName: cmd.fileName,
      filePath: cmd.filePath,
      fileSize: cmd.fileSize,
    });
    await this.repo.save(entity);
    return id;
  }
}
