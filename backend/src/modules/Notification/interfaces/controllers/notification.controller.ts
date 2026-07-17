import { Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationRepository } from '../../application/ports/notification.repository.port';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationController {
  constructor(private readonly notificationRepo: NotificationRepository) {}

  @Get()
  async findAll(@Req() req: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    const result = await this.notificationRepo.findAllByUserId(req.user.id, limit ?? 50, offset ?? 0);
    return { data: result.data.map((n) => ({ id: n.id, ...n.props })), total: result.total };
  }

  @Get('/unread/count')
  async countUnread(@Req() req: any) {
    const count = await this.notificationRepo.countUnread(req.user.id);
    return { count };
  }

  @Get('/unread/list')
  async listUnread(@Req() req: any) {
    const notifications = await this.notificationRepo.findUnreadByUserId(req.user.id);
    return { data: notifications.map((n) => ({ id: n.id, ...n.props })) };
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string, @Req() req: any) {
    const result = await this.notificationRepo.findAllByUserId(req.user.id);
    const notification = result.data.find((n) => n.id === id);
    if (notification) {
      notification.markRead();
      await this.notificationRepo.update(notification);
    }
    return { message: 'OK' };
  }
}
