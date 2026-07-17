export class ReportResponseDto {
  id: string; workProgramId: string; submittedBy: string;
  progressPct: number; description: string; obstacles?: string;
  constructor(d: any) {
    this.id = d.id; this.workProgramId = d.workProgramId; this.submittedBy = d.submittedBy;
    this.progressPct = d.progressPct; this.description = d.description; this.obstacles = d.obstacles;
  }
}
