import { NestFactory } from '@nestjs/core';
import { AppModule } from './model/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './middleware/logger.middleware';
import { EventsAdapter } from './events/events.adapter';
import { AllExceptionsFilter } from './middleware/any-exception.filter';
import { TransformInterceptor } from './middleware/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(logger);
  app.useWebSocketAdapter(new EventsAdapter(app)); //websocket通信
  app.useGlobalFilters(new AllExceptionsFilter()); //过滤拦截
  app.useGlobalInterceptors(new TransformInterceptor()); //格式化返回值
  app.useGlobalPipes(new ValidationPipe()); //管道验证

  /*swagger接口文档  */
  const options = new DocumentBuilder()
    .setTitle('SWAGGER DOCUMENT')
    .setDescription('nest接口文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  await app.listen(config.port);
}
bootstrap();
