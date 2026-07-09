import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../../../user/application/ports/user.repository.port';
import { LoginCommand } from './login.command';
import { InvalidCredentialsError } from '../../../../user/domain/user.errors';
import { UserResponseDto } from '../../../../user/interfaces/dtos/user.response.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<{ token: string; user: UserResponseDto }> {
    const user = await this.userRepo.findByEmail(command.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordValid = await bcrypt.compare(command.password, user.getPasswordForPersistence());

    if (!passwordValid) {
      throw new InvalidCredentialsError();
    }

    if (!user.isActive) {
      throw new InvalidCredentialsError();
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: new UserResponseDto(user),
    };
  }
}
