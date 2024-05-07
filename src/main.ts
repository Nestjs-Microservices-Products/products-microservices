import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('ProductsMS');
  /* const app = await NestFactory.create(AppModule); */ //? api resfull

  const app = await NestFactory.createMicroservice<MicroserviceOptions>( //? microservices
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(/* envs.port */);

  logger.log(`Products Microservices running on port ${envs.port} `);
}
bootstrap();
