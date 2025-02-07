import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(app.get(ConfigService).getOrThrow("PORT"));
}
bootstrap();
