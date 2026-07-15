import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import open from 'open';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Wiki Zelda API')
    .setDescription('API backend da Wiki Zelda — Programação IV')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log('✅ Servidor rodando em: http://localhost:3000');
  console.log('📖 Swagger disponível em: http://localhost:3000/api');

  open('http://localhost:3000/api'); // abre o Swagger no browser automaticamente
}
bootstrap();