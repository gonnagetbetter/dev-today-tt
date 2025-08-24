import { Module } from '@nestjs/common';
import { CountriesNowClientService } from './countries-now-client.service';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [HttpModule],
  providers: [CountriesNowClientService],
  exports: [CountriesNowClientService],
})
export class CountriesNowClientModule {}
