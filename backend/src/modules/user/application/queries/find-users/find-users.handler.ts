import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../ports/user.repository.port';
import { FindUsersQuery } from './find-users.query';

@Injectable()
export class FindUsersHandler {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: FindUsersQuery) {
    const users = await this.userRepo.findAll();
    return users;
  }
}
