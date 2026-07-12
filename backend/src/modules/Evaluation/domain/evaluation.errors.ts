export abstract class EvaluationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class EvaluationNotFoundError extends EvaluationError {
  constructor(id: string) {
    super(`Evaluation ${id} not found`);
  }
}

export class EvaluationAlreadySubmittedError extends EvaluationError {
  constructor(id: string) {
    super(`Evaluation ${id} is already submitted`);
  }
}
