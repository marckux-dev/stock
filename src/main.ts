import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove properties that do not have decorators
    forbidNonWhitelisted: true, // throw error when properties that do not have decorators
    transform: true, // transform payload to DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
