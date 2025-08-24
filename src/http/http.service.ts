import { Injectable, Logger } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);

  constructor(private readonly httpService: NestHttpService) {}

  async get<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data as T;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async post<T>(url: string, dto: any): Promise<T> {
    try {
      const response = await firstValueFrom(this.httpService.post(url, dto));
      return response.data as T;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
