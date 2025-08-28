import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('superadmin/notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  // GET /superadmin/notifications?user_id=...&is_read=true/false
  @Get()
  list(@Query('user_id') user_id?: string, @Query('is_read') is_read?: string) {
    const opts: any = {};
    if (user_id) opts.user_id = Number(user_id);
    if (is_read !== undefined) opts.is_read = is_read === 'true';
    return this.service.findAll(opts);
  }

  // POST /superadmin/notifications { user_id, message }
  @Post()
  create(@Body() body: { user_id: number; message: string }) {
    return this.service.create(body.user_id, body.message);
  }

  // PUT /superadmin/notifications/:id/read
  @Put(':id/read')
  markRead(@Param('id') id: string) {
    return this.service.markRead(Number(id));
  }

  // PUT /superadmin/notifications/:id/unread
  @Put(':id/unread')
  markUnread(@Param('id') id: string) {
    return this.service.markUnread(Number(id));
  }

  // PUT /superadmin/notifications/mark-all-read?user_id=123 (optional)
  @Put('mark-all-read')
  markAllRead(@Query('user_id') user_id?: string) {
    return this.service.markAllRead(user_id ? Number(user_id) : undefined);
  }

  // DELETE /superadmin/notifications/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
