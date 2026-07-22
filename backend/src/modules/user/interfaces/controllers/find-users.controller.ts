import { Controller, Get } from '@nestjs/common';
import { FindUsersHandler } from '../../application/queries/find-users/find-users.handler';
import { FindUsersQuery } from '../../application/queries/find-users/find-users.query';
import { UserResponseDto } from '../dtos/user.response.dto';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../domain/user.entity";

@Controller('users')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.BENDAHARA, Role.SEKRETARIS, Role.PIC_STAFF, Role.ADMIN)
export class FindUsersController {
  constructor(private readonly findUsersHandler: FindUsersHandler) {}

  @Get()
  async findAll() {
    const users = await this.findUsersHandler.execute(new FindUsersQuery());
    return users.map((user) => new UserResponseDto(user));
  }
}
