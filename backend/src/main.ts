import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Prefixo global da API
  app.setGlobalPrefix('api/v1');

  // Helmet para segurança HTTP
  app.use(helmet());

  // CORS configurado
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'https://ajucat.org.br',
    'https://www.ajucat.org.br',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origem não permitida pelo CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });

  // Validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger / OpenAPI
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AJUCAT API')
      .setDescription(
        'API da Associação dos Juízes Católicos — Sistema de gestão institucional',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Autenticação')
      .addTag('Usuários')
      .addTag('Roles')
      .addTag('Notícias')
      .addTag('Documentos')
      .addTag('Circulares')
      .addTag('Storage')
      .addTag('Auditoria')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log('Swagger disponível em: /api/docs');
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`🚀 Backend AJUCAT rodando na porta ${port}`);
  logger.log(`📚 Ambiente: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
