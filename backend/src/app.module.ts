import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './libs/db/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WorkProgramModule } from './modules/WorkProgram/work-program.module';
import { EvaluationModule } from './modules/Evaluation/evaluation.module';
import { FeeModule } from './modules/Fee/fee.module';
import { ProgressReportModule } from './modules/ProgressReport/progress-report.module';
import { KasModule } from './modules/Kas/kas.module';
import { DocumentModule } from './modules/Document/document.module';
import { KakModule } from './modules/Kak/kak.module';
import { NotificationModule } from './modules/Notification/notification.module';
import { DomainExceptionFilter } from './libs/filters/domain-exception.filter';
import { ExportModule } from './modules/Export/export.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule, WorkProgramModule, EvaluationModule, FeeModule, ProgressReportModule, KasModule, DocumentModule, KakModule, NotificationModule, ExportModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
