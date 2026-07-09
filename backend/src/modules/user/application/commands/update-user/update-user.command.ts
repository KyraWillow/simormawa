import { Role } from '../../../domain/user.entity';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: Role,
  ) {}
}
