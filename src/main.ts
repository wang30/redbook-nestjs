import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const config = app.get(ConfigService);

  const port = config.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // DTO未定义的字段自动过滤
    forbidNonWhitelisted: true,  // 传了多余字段就报错
    transform: true,  // 自动类型转换
  }));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  })

  await app.listen(port);
}
bootstrap();
