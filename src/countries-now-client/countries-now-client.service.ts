import { Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { GetPopulationDto } from './dto/get-population.dto';
import { GetFlagUrlDto } from './dto/get-flag-url.dto';
import { config } from '../config';
import { IFlagResponse } from './interfaces/flag-url-response';
import { IPopulationResponse } from './interfaces/population-response.interface';

@Injectable()
export class CountriesNowClientService {
  constructor(private readonly httpService: HttpService) {}

  async getPopulation(dto: GetPopulationDto) {
    const url = `${config.countriesNowBaseUrl}/population`;
    const response = await this.httpService.post<IPopulationResponse>(url, dto);
    return response.data.populationCounts;
  }

  async getFlagUrl(dto: GetFlagUrlDto) {
    const url = `${config.countriesNowBaseUrl}/flag/images`;
    const response = await this.httpService.post<IFlagResponse>(url, dto);
    return response.data.flag;
  }
}
