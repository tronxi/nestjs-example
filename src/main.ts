import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TokenInterceptor } from './users/infrastructure/api/rest/authentication/token.interceptor';
import { DomainExceptionFilter } from './users/infrastructure/api/rest/error/domain.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nestjs example')
    .setDescription('Nestjs-example API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(3000);
}
bootstrap();
