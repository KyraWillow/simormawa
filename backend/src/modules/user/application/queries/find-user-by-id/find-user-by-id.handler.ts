import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository.port';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { UserNotFoundError } from '../../../domain/user.errors';

@Injectable()
export class FindUserByIdHandler {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: FindUserByIdQuery) {
    const user = await this.userRepo.findById(query.id);

    if (!user) {
      throw new UserNotFoundError(query.id);
    }

    return user;
  }
}
