import { Module } from '@nestjs/common';
import { NagerClientService } from './nager-client.service';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [HttpModule],
  providers: [NagerClientService],
  exports: [NagerClientService],
})
export class NagerClientModule {}
