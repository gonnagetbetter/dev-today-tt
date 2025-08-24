import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { Between, Repository } from 'typeorm';
import { NagerClientService } from '../nager-client/nager-client.service';
import { AddEventsDto } from './dto/add-event.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CalendarEventsService {
  private readonly logger = new Logger(CalendarEventsService.name);
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly calendarEventRepository: Repository<CalendarEvent>,
    private readonly usersService: UsersService,
    private readonly nagerClientService: NagerClientService,
  ) {}

  async addHolidays(
    userId: number,
    dto: AddEventsDto,
  ): Promise<CalendarEvent[]> {
    this.logger.debug(`Adding holidays for user with id: ${userId}`);

    const user = await this.usersService.findOne(userId);

    const allHolidays = await this.nagerClientService.getHolidays(
      dto.countryCode,
      dto.year,
    );

    if (!allHolidays.length) {
      this.logger.error(
        `No holidays found for country ${dto.countryCode} in year ${dto.year}`,
      );
      throw new BadRequestException(
        `No holidays found for country ${dto.countryCode} in year ${dto.year}`,
      );
    }

    let selectedHolidays = allHolidays;

    if (dto.holidays && dto.holidays.length > 0) {
      selectedHolidays = allHolidays.filter((holiday) =>
        dto.holidays!.includes(holiday.name),
      );
    } else {
      this.logger.warn(
        `No specific holidays provided, adding all holidays for country ${dto.countryCode} in year ${dto.year}`,
      );
    }

    if (!selectedHolidays.length) {
      this.logger.error(
        `No matching holidays found for the provided names in country ${dto.countryCode} in year ${dto.year}`,
      );
      throw new BadRequestException(
        `No matching holidays found for the provided names in country ${dto.countryCode} in year ${dto.year}`,
      );
    }

    const yearStartDate = new Date(dto.year, 0, 1); // January 1st
    const yearEndDate = new Date(dto.year, 11, 31); // December 31st

    const existingEvents = await this.calendarEventRepository.find({
      where: {
        userId,
        countryCode: dto.countryCode,
        date: Between(yearStartDate, yearEndDate),
      },
    });

    // Create a set of existing event keys (name + date)
    const existingEventKeys = new Set(
      existingEvents.map(
        (event) => `${event.name}_${event.date.toISOString().split('T')[0]}`,
      ),
    );

    // Filter out holidays that already exist in the user's calendar
    const newHolidays = selectedHolidays.filter((holiday) => {
      const holidayKey = `${holiday.name}_${holiday.date}`;
      return !existingEventKeys.has(holidayKey);
    });

    if (!newHolidays.length) {
      this.logger.warn(
        `All selected holidays already exist in user ${userId}'s calendar`,
      );
      return [];
    }

    const calendarEvents = newHolidays.map((holiday) => {
      const event = new CalendarEvent();
      event.name = holiday.name;
      event.date = new Date(holiday.date);
      event.countryCode = dto.countryCode;
      event.description = holiday.localName;
      event.userId = userId;

      return event;
    });

    const savedEvents = await this.calendarEventRepository.save(calendarEvents);

    this.logger.debug(
      `Added ${savedEvents.length} new holidays to user ${userId}'s calendar`,
    );

    return savedEvents;
  }
}
