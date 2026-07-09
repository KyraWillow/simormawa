import { Module } from '@nestjs/common';
import { CreateUserController } from './interfaces/controllers/create-user.controller';
import { UpdateUserController } from './interfaces/controllers/update-user.controller';
import { DeactivateUserController } from './interfaces/controllers/deactivate-user.controller';
import { FindUsersController } from './interfaces/controllers/find-users.controller';
import { FindUserByIdController } from './interfaces/controllers/find-user-by-id.controller';
import { CreateUserService } from './application/commands/create-user/create-user.service';
import { UpdateUserService } from './application/commands/update-user/update-user.service';
import { DeactivateUserService } from './application/commands/deactivate-user/deactivate-user.service';
import { FindUsersHandler } from './application/queries/find-users/find-users.handler';
import { FindUserByIdHandler } from './application/queries/find-user-by-id/find-user-by-id.handler';
import { UserRepository } from './application/ports/user.repository.port';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { UserMapper } from './infrastructure/user.mapper';

@Module({
  controllers: [
    CreateUserController,
    UpdateUserController,
    DeactivateUserController,
    FindUsersController,
    FindUserByIdController,
  ],
  providers: [
    CreateUserService,
    UpdateUserService,
    DeactivateUserService,
    FindUsersHandler,
    FindUserByIdHandler,
    UserMapper,
    { provide: UserRepository, useClass: UserRepositoryImpl },
  ],
  exports: [UserRepository],
})
export class UserModule {}
