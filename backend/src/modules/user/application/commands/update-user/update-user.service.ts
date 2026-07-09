import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository.port';
import { UpdateUserCommand } from './update-user.command';
import { UserNotFoundError } from '../../../domain/user.errors';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepo.findById(command.id);

    if (!user) {
      throw new UserNotFoundError(command.id);
    }

    user.updateProfile(command.email, command.name, command.role);
    await this.userRepo.save(user);
  }
}
