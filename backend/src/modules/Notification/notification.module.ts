import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationRepository } from './application/ports/notification.repository.port';
import { NotificationRepositoryImpl } from './infrastructure/notification.repository';
import { NotificationMapper } from './infrastructure/notification.mapper';
import { NotificationCronService } from './application/services/notification-cron.service';
import { NotificationController } from './interfaces/controllers/notification.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [NotificationController],
  providers: [
    NotificationMapper,
    NotificationCronService,
    { provide: NotificationRepository, useClass: NotificationRepositoryImpl },
  ],
  exports: [NotificationCronService],
})
export class NotificationModule {}
