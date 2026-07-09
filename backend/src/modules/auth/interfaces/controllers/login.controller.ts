import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from '../../application/commands/login/login.service';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { LoginCommand } from '../../application/commands/login/login.command';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginRequestDto) {
    return this.loginService.execute(new LoginCommand(dto.email, dto.password));
  }
}
