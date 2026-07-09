import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserService } from '../../application/commands/create-user/create-user.service';
import { CreateUserRequestDto } from '../dtos/create-user.request.dto';
import { CreateUserCommand } from '../../application/commands/create-user/create-user.command';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserRequestDto) {
    const userId = await this.createUserService.execute(
      new CreateUserCommand(dto.email, dto.name, dto.role, dto.password),
    );
    return { id: userId };
  }
}
