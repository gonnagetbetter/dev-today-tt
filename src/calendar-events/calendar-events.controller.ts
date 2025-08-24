import { Body, Controller, Param, Post } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { AddEventsDto } from './dto/add-event.dto';
import { CalendarEvent } from './entities/calendar-event.entity';

@Controller('users/:userId/calendar')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Post('holidays')
  async addHolidays(
    @Param('userId') userId: number,
    @Body() holidays: AddEventsDto,
  ): Promise<CalendarEvent[]> {
    return await this.calendarEventsService.addHolidays(userId, holidays);
  }
}
