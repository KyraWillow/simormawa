import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentRepository } from './application/ports/document.repository.port';
import { DocumentRepositoryImpl } from './infrastructure/document.repository';
import { DocumentMapper } from './infrastructure/document.mapper';
import { UploadDocumentService } from './application/commands/upload-document/upload-document.service';
import { FindDocumentsHandler } from './application/queries/find-documents/find-documents.handler';
import { DocumentController } from './interfaces/controllers/document.controller';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [DocumentController],
  providers: [
    UploadDocumentService,
    FindDocumentsHandler,
    DocumentMapper,
    { provide: DocumentRepository, useClass: DocumentRepositoryImpl },
  ],
  exports: [DocumentRepository],
})
export class DocumentModule { }
