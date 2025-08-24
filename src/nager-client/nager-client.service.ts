import { Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { ICountryInfo } from './interfaces/country-info-response';
import { config } from '../config';
import { IPublicHoliday } from './interfaces/public-holiday-response';

@Injectable()
export class NagerClientService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries(): Promise<string[]> {
    const url = `${config.naggerBaseUrl}/AvailableCountries`;
    return await this.httpService.get<string[]>(url);
  }

  async getCountryInfo(countryCode: string) {
    const url = `${config.naggerBaseUrl}/CountryInfo/${countryCode}`;
    return await this.httpService.get<ICountryInfo>(url);
  }

  async getHolidays(countryCode: string, year: number) {
    const url = `${config.naggerBaseUrl}/PublicHolidays/${year}/${countryCode}`;
    return await this.httpService.get<IPublicHoliday[]>(url);
  }
}
