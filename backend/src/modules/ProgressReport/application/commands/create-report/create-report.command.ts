export class CreateReportCommand {
  constructor(
    public readonly workProgramId: string,
    public readonly submittedBy: string,
    public readonly progressPct: number,
    public readonly description: string,
    public readonly obstacles?: string,
  ) {}
}
