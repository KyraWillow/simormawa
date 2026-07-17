export class ApproveBudgetCommand {
  constructor(public readonly id: string, public readonly action: 'approved' | 'rejected', public readonly notes?: string) {}
}
