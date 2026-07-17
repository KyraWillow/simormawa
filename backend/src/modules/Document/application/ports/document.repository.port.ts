import { DocumentEntity } from "../../domain/document.entity";
export abstract class DocumentRepository {
  abstract findByWorkProgramId(wpId: string): Promise<DocumentEntity[]>;
  abstract save(e: DocumentEntity): Promise<DocumentEntity>;
}
