import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = '3001';
  }
  await app.listen(port);
}
bootstrap();
