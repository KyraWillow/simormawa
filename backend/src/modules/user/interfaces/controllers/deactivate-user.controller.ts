import { Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { DeactivateUserService } from '../../application/commands/deactivate-user/deactivate-user.service';
import { DeactivateUserCommand } from '../../application/commands/deactivate-user/deactivate-user.command';

@Controller('users')
export class DeactivateUserController {
  constructor(private readonly deactivateUserService: DeactivateUserService) {}

  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  async deactivate(@Param('id') id: string) {
    await this.deactivateUserService.execute(new DeactivateUserCommand(id));
    return { message: 'User deactivated successfully' };
  }
}
