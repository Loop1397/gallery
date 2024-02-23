import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 정적 파일 제공을 위한 public폴더 설정
  app.use('/images', express.static(path.join(__dirname, '../files', 'public', 'images')));
  await app.listen(3000);
}
bootstrap();