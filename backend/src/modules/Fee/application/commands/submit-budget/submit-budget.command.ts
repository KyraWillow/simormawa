export class SubmitBudgetCommand {
  constructor(public readonly id: string, public readonly notes?: string) {}
}
