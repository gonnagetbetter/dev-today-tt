import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { NagerClientModule } from './nager-client/nager-client.module';
import { CountriesNowClientModule } from './countries-now-client/countries-now-client.module';
import { CountryModule } from './country/country.module';
import { UsersModule } from './users/users.module';
import { CalendarEventsModule } from './calendar-events/calendar-events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbName,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    HttpModule,
    NagerClientModule,
    CountriesNowClientModule,
    CountryModule,
    UsersModule,
    CalendarEventsModule,
  ],
})
export class AppModule {}
