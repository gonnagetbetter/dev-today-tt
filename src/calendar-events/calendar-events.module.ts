import { Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEvent } from './entities/calendar-event.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NagerClientModule } from '../nager-client/nager-client.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CalendarEvent, User]),
    NagerClientModule,
    UsersModule,
  ],
  providers: [CalendarEventsService],
  controllers: [CalendarEventsController],
})
export class CalendarEventsModule {}
