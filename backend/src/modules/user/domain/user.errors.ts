export abstract class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UserAlreadyExistsError extends UserError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}

export class UserNotFoundError extends UserError {
  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}

export class InvalidCredentialsError extends UserError {
  constructor() {
    super('Invalid email or password');
  }
}

export class UserAlreadyDeactivatedError extends UserError {
  constructor(id: string) {
    super(`User with id ${id} is already deactivated`);
  }
}
