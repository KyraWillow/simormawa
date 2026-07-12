import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './interfaces/controllers/login.controller';
import { LoginService } from './application/commands/login/login.service';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { RolesGuard } from './infrastructure/roles.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'default-secret-change-me',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy, RolesGuard],
  exports: [JwtModule, PassportModule, RolesGuard],
})
export class AuthModule {}
