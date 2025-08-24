import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { NagerClientModule } from '../nager-client/nager-client.module';
import { CountriesNowClientModule } from '../countries-now-client/countries-now-client.module';

@Module({
  imports: [NagerClientModule, CountriesNowClientModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
