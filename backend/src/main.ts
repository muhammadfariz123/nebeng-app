import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe()) // ⬅️ Tambahkan ini

  await app.listen(3000)
}
bootstrap()
