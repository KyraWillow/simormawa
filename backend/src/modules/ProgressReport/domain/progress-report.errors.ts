export class ProgressReportNotFoundError extends Error {
  constructor(id: string) {
    super('Report ' + id + ' not found');
    this.name = 'ProgressReportNotFoundError';
  }
}
