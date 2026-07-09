import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository.port';
import { DeactivateUserCommand } from './deactivate-user.command';
import { UserNotFoundError } from '../../../domain/user.errors';

@Injectable()
export class DeactivateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: DeactivateUserCommand): Promise<void> {
    const user = await this.userRepo.findById(command.id);

    if (!user) {
      throw new UserNotFoundError(command.id);
    }

    user.deactivate();
    await this.userRepo.save(user);
  }
}
