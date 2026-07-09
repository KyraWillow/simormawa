import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateUserService } from '../../application/commands/update-user/update-user.service';
import { UpdateUserRequestDto } from '../dtos/update-user.request.dto';
import { UpdateUserCommand } from '../../application/commands/update-user/update-user.command';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateUserRequestDto) {
    await this.updateUserService.execute(
      new UpdateUserCommand(id, dto.email, dto.name, dto.role),
    );
    return { message: 'User updated successfully' };
  }
}
