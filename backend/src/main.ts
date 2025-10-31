// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Izinkan akses dari frontend (Next.js)
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // ✅ Middleware bawaan NestJS sudah otomatis aktif (body-parser), jadi tidak perlu express.json()
  // tapi kita aktifkan URL encoding juga untuk jaga-jaga
  app.useBodyParser('json');
  app.useBodyParser('urlencoded', { extended: true });

  // ✅ Serve folder uploads (kalau ada gambar)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // ✅ Validasi global DTO (otomatis reject field yang tidak dikenal)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3001);
  console.log('🚀 Backend berjalan di http://localhost:3001');
}
bootstrap();
