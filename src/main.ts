import { NestFactory } from '@nestjs/core';
import { AppModule } from './model/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './middleware/logger.middleware';
import { EventsAdapter } from './events/events.adapter';
import { AllExceptionsFilter } from './middleware/any-exception.filter';
import { TransformInterceptor } from './middleware/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import conf from './config';
import { JwthGuard } from './middleware/jwt.middleware';
import { JwtService } from './model/jwt/jwtService';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(logger);//日志中间件
  app.useGlobalGuards(new JwthGuard(new JwtService))
  app.useWebSocketAdapter(new EventsAdapter(app)); //websocket通信
  app.useGlobalFilters(new AllExceptionsFilter()); //过滤拦截
  app.useGlobalInterceptors(new TransformInterceptor()); //格式化返回值
  app.useGlobalPipes(new ValidationPipe()); //管道验证F

  /*swagger接口文档  */
  const options = new DocumentBuilder()
    .setTitle('SWAGGER DOCUMENT')
    .setDescription('nest接口文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/swag', app, document);
  await app.listen(conf.port);

  console.log("server has started at:",conf.port)
}
bootstrap();
