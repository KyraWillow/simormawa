import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';

export interface DocumentProps {
  workProgramId: string;
  uploadedBy: string;
  type: string;
  fileName: string;
  filePath: string;
  fileSize: number;
}

export class DocumentEntity extends AggregateRoot<DocumentProps> {
  private constructor(p: DocumentProps, id: string) { super(p, id); }

  static create(id: string, props: DocumentProps): DocumentEntity {
    return new DocumentEntity(props, id);
  }

  get workProgramId(): string { return this.props.workProgramId; }
  get uploadedBy(): string { return this.props.uploadedBy; }
  get type(): string { return this.props.type; }
  get fileName(): string { return this.props.fileName; }
  get filePath(): string { return this.props.filePath; }
  get fileSize(): number { return this.props.fileSize; }

  validate(): void {
    if (!this.props.workProgramId) throw new Error('Work program is required');
    if (!this.props.uploadedBy) throw new Error('Uploader is required');
    if (!this.props.fileName) throw new Error('File name is required');
  }

  static fromPersistence(id: string, p: DocumentProps): DocumentEntity { return new DocumentEntity(p, id); }
}
