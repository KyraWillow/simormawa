import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository.port';
import { DeleteUserCommand } from './delete-user.command';
import { UserNotFoundError } from '../../../domain/user.errors';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const user = await this.userRepo.findById(command.id);
    if (!user) throw new UserNotFoundError(command.id);
    await this.userRepo.delete(command.id);
  }
}
