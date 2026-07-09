import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../../../domain/user.entity';
import { UserRepository } from '../../ports/user.repository.port';
import { CreateUserCommand } from './create-user.command';
import { UserAlreadyExistsError } from '../../../domain/user.errors';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const existingUser = await this.userRepo.findByEmail(command.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(command.email);
    }

    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(command.password, 10);
    const user = UserEntity.create(id, command.email, command.name, command.role, hashedPassword);
    await this.userRepo.save(user);
    return user.id;
  }
}
