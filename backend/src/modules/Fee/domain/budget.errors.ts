export abstract class BudgetError extends Error {
  constructor(m: string) { super(m); this.name = this.constructor.name; }
}
export class BudgetNotFoundError extends BudgetError {
  constructor(id: string) { super('Budget ' + id + ' not found'); }
}
export class InvalidBudgetTransitionError extends BudgetError {
  constructor(s: string) { super('Invalid budget transition: ' + s); }
}
