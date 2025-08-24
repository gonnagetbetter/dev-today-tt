import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!config.port) {
    throw new Error('Port is not defined');
  }
  await app.listen(config.port);
}
bootstrap();
