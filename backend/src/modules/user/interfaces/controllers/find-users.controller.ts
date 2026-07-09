import { Controller, Get } from '@nestjs/common';
import { FindUsersHandler } from '../../application/queries/find-users/find-users.handler';
import { FindUsersQuery } from '../../application/queries/find-users/find-users.query';
import { UserResponseDto } from '../dtos/user.response.dto';

@Controller('users')
export class FindUsersController {
  constructor(private readonly findUsersHandler: FindUsersHandler) {}

  @Get()
  async findAll() {
    const users = await this.findUsersHandler.execute(new FindUsersQuery());
    return users.map((user) => new UserResponseDto(user));
  }
}
