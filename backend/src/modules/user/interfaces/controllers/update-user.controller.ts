import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateUserService } from '../../application/commands/update-user/update-user.service';
import { UpdateUserRequestDto } from '../dtos/update-user.request.dto';
import { UpdateUserCommand } from '../../application/commands/update-user/update-user.command';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../domain/user.entity";

@Controller('users')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.ADMIN)
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
