import { Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { DeactivateUserService } from '../../application/commands/deactivate-user/deactivate-user.service';

import { DeactivateUserCommand } from '../../application/commands/deactivate-user/deactivate-user.command';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../domain/user.entity";

@Controller('users')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.ADMIN)
export class DeactivateUserController {
  constructor(private readonly deactivateUserService: DeactivateUserService) {}

  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  async deactivate(@Param('id') id: string) {
    await this.deactivateUserService.execute(new DeactivateUserCommand(id));
    return { message: 'User deactivated successfully' };
  }
}
