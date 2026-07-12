import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './libs/db/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WorkProgramModule } from './modules/WorkProgram/work-program.module';
import { EvaluationModule } from './modules/Evaluation/evaluation.module';
import { DomainExceptionFilter } from './libs/filters/domain-exception.filter';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule, WorkProgramModule, EvaluationModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
