import { NestFactory } from '@nestjs/core';
import { AppModule } from './model/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {  logger } from './middleware/logger.middleware';
import { EventsAdapter } from './events/events.adapter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import conf from './config';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  // app.use(logger); //日志中间件
  app.setGlobalPrefix('/api/'); //全局访问地址统一前缀
  app.useWebSocketAdapter(new EventsAdapter(app)); //websocket通信
  // app.useGlobalGuards(new LoggerMiddle(new MongoLogService()))
  // app.useGlobalGuards(new CasbinMidddleware(new CasbinService()))//全局权限验证
  // app.useGlobalGuards(new JwthGuard(new JwtService())); //全局身份验证
  // app.useGlobalFilters(new AllExceptionsFilter()); //过滤拦截
  // app.useGlobalInterceptors(new TransformInterceptor(new CasbinService())); //格式化返回值,拦截是否有请求权限
  // app.useGlobalPipes(new ValidationPipe()); //管道验证
  // 使用 cookie-parser 中间件
  app.use(cookieParser());

  // 设置 CSRF 中间件
  app.use(
    csurf({
      cookie: {
        httpOnly: true, // 令牌在 cookie 中，且不能通过 JavaScript 访问
      },
    }),
  );
  /*swagger接口文档  */
  const options = new DocumentBuilder()
    .setTitle('SWAGGER DOCUMENT')
    .setDescription('nest接口文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/swag', app, document);
  await app.listen(conf.port);

  console.log('server has started at:', conf.port);
}
bootstrap();
