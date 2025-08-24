import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/availableCountries')
  async getAvailableCountries() {
    return await this.countryService.getAvailableCountries();
  }

  @Get('/countryInfo/:code')
  async getCountryInfo(@Param('code') code: string) {
    return await this.countryService.getCountryInfo(code.toUpperCase());
  }
}
