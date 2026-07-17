import { DocumentEntity } from '../domain/document.entity';
import { DocumentPersistenceModel } from './document.persistence';

export class DocumentMapper {
  toDomain(r: DocumentPersistenceModel): DocumentEntity {
    return DocumentEntity.fromPersistence(r.id, {
      workProgramId: r.work_program_id,
      uploadedBy: r.uploaded_by,
      type: r.type,
      fileName: r.file_name,
      filePath: r.file_path,
      fileSize: r.file_size,
    });
  }
  toPersistence(e: DocumentEntity): DocumentPersistenceModel {
    return {
      id: e.id,
      work_program_id: e.workProgramId,
      uploaded_by: e.uploadedBy,
      type: e.type,
      file_name: e.fileName,
      file_path: e.filePath,
      file_size: e.fileSize,
      created_at: new Date(),
    };
  }
}
