import { Injectable } from '@nestjs/common';
import { NagerClientService } from '../nager-client/nager-client.service';
import { CountriesNowClientService } from '../countries-now-client/countries-now-client.service';

@Injectable()
export class CountryService {
  constructor(
    private readonly naggerClientService: NagerClientService,
    private readonly countriesNowClientService: CountriesNowClientService,
  ) {}

  async getAvailableCountries() {
    return await this.naggerClientService.getAvailableCountries();
  }

  async getCountryInfo(countryCode: string) {
    const countryInfo =
      await this.naggerClientService.getCountryInfo(countryCode);

    const population = await this.countriesNowClientService.getPopulation({
      country: countryInfo.commonName,
    });

    const flagUrl = await this.countriesNowClientService.getFlagUrl({
      iso2: countryInfo.countryCode,
    });

    return {
      borders: countryInfo.borders.map((country) => ({
        commonName: country.commonName,
        officialName: country.officialName,
        countryCode: country.countryCode,
      })),
      population: population,
      flagUrl: flagUrl,
    };
  }
}
