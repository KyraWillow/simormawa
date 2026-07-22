import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/infrastructure/roles.guard';
import { Roles } from '../../../auth/infrastructure/roles.decorator';
import { Role } from '../../domain/user.entity';
import { DeleteUserService } from '../../application/commands/delete-user/delete-user.service';
import { DeleteUserCommand } from '../../application/commands/delete-user/delete-user.command';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.deleteUserService.execute(new DeleteUserCommand(id));
    return { message: 'User deleted successfully' };
  }
}
