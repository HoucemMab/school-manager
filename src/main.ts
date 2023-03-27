import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, { cors: true });
=======
  const app = await NestFactory.create(AppModule);
  app.use(cors());
>>>>>>> 688f0fa2ee679376d2135d1c4115bc44082753b5
  await app.listen(3000);
}
bootstrap();
