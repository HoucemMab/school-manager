import { Controller, Get, Param, Body, Post } from '@nestjs/common';

import { NotificationServiceGateway } from './notification.service';
import { NotificationEntity } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationServiceGateway,
  ) {}

  @Get('/:id')
  async getNotifs(@Param() id: string): Promise<NotificationEntity[]> {
    return await this.notificationService.getNotifsByUserId(id);
  }
  @Post()
  async postNotifs(
    @Body() notif: NotificationEntity,
  ): Promise<NotificationEntity> {
    return await this.notificationService.postNotif(notif);
  }
}
