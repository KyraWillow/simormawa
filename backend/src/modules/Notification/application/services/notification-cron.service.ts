import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationRepository } from '../ports/notification.repository.port';
import { NotificationEntity } from '../../domain/notification.entity';

@Injectable()
export class NotificationCronService {
  private readonly logger = new Logger(NotificationCronService.name);

  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: any,
    private readonly notificationRepo: NotificationRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkDeadlines(): Promise<void> {
    this.logger.log('Checking work program deadlines...');

    const upcoming = await this.pool.query(
      `SELECT wp.id, wp.name, wp.deadline, wp.pic_id, u.name as pic_name
       FROM work_programs wp
       JOIN users u ON u.id = wp.pic_id
       WHERE wp.status IN ('NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD')
         AND wp.deadline BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY)`,
    );

    for (const wp of upcoming) {
      const daysLeft = Math.ceil((new Date(wp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      let title = '';
      let link = `/work-programs/${wp.id}`;

      if (daysLeft <= 0) {
        title = `Deadline hari ini: ${wp.name}`;
      } else if (daysLeft <= 7) {
        title = `H-${daysLeft}: ${wp.name} — deadline mendekat`;
      } else if (daysLeft === 14) {
        title = `H-14: ${wp.name} — deadline 2 minggu lagi`;
      } else if (daysLeft === 30) {
        title = `H-30: ${wp.name} — deadline sebulan lagi`;
      } else if (daysLeft <= 30 && daysLeft % 7 === 0) {
        title = `H-${daysLeft}: ${wp.name}`;
      } else {
        continue;
      }

      const notification = NotificationEntity.create({
        userId: wp.pic_id,
        type: 'deadline',
        title,
        message: `Program kerja "${wp.name}" memiliki deadline pada ${new Date(wp.deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} (sisa ${daysLeft} hari).`,
        link,
      });

      await this.notificationRepo.save(notification);
      this.logger.log(`Notification sent to ${wp.pic_name} for "${wp.name}" (H-${daysLeft})`);
    }

    this.logger.log('Deadline check complete.');
  }

  async createBudgetNotification(userId: string, budgetId: string, workProgramName: string, status: string): Promise<void> {
    const title = status === 'approved' ? 'Anggaran disetujui' : status === 'rejected' ? 'Anggaran ditolak' : 'Anggaran diajukan';
    const notification = NotificationEntity.create({
      userId,
      type: 'budget',
      title: `${title}: ${workProgramName}`,
      message: `Anggaran untuk program kerja "${workProgramName}" telah ${status === 'approved' ? 'disetujui' : status === 'rejected' ? 'ditolak' : 'diajukan'}.`,
      link: `/finance`,
    });
    await this.notificationRepo.save(notification);
  }

  async createEvaluationNotification(userId: string, workProgramName: string): Promise<void> {
    const notification = NotificationEntity.create({
      userId,
      type: 'evaluation',
      title: `Evaluasi baru: ${workProgramName}`,
      message: `Evaluasi untuk program kerja "${workProgramName}" telah disubmit.`,
      link: `/evaluations`,
    });
    await this.notificationRepo.save(notification);
  }
}
