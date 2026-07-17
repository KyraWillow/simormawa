export abstract class KasError extends Error {
  constructor(m: string) { super(m); this.name = this.constructor.name; }
}
export class KasNotFoundError extends KasError {
  constructor() { super('Kas not found. Run seed first.'); }
}
export class InsufficientBalanceError extends KasError {
  constructor() { super('Saldo tidak mencukupi'); }
}
