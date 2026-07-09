import { Controller, Get, Param } from '@nestjs/common';
import { FindUserByIdHandler } from '../../application/queries/find-user-by-id/find-user-by-id.handler';
import { FindUserByIdQuery } from '../../application/queries/find-user-by-id/find-user-by-id.query';
import { UserResponseDto } from '../dtos/user.response.dto';

@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserByIdHandler: FindUserByIdHandler) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.findUserByIdHandler.execute(new FindUserByIdQuery(id));
    return new UserResponseDto(user);
  }
}
