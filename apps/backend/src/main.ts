import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupCors(app: INestApplication) {
  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
  });
}

function setupVersioning(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('DrPatch Backend')
    .setDescription('DrPatch shop backend services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupCors(app);
  setupVersioning(app);
  setupSwagger(app);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
