export class UploadDocumentCommand {
  constructor(
    public readonly workProgramId: string,
    public readonly uploadedBy: string,
    public readonly type: string,
    public readonly fileName: string,
    public readonly filePath: string,
    public readonly fileSize: number,
  ) {}
}
