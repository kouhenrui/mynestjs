import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomException } from 'src/config/utils/error';
import { JwtStrategy } from 'src/model/jwt/jwt.strategy';
import { JwtModules } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwtService';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import conf from 'src/config';
import { DbLogger } from 'src/config/log4js';
import { RedisService } from '../../service/redis.service';
import { CasbinService } from 'src/service/casbin.service';
import { LoggerMiddle } from 'src/middleware/logger.middleware';
import { JwthGuard, JwthMiddleware } from 'src/middleware/jwt.middleware';
import { TransformInterceptor } from 'src/middleware/transform.interceptor';
import { AllExceptionsFilter } from 'src/middleware/any-exception.filter';
import { CasbinMidddleware } from 'src/middleware/casbin.middleware';
import { OperateLog } from 'src/entity/new/operate_log.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name:"default",
      type: 'mysql',
      host: conf.mysql.host,
      port: conf.mysql.port,
      username: conf.mysql.username,
      password: conf.mysql.password,
      database: conf.mysql.database,
      entities: ['dist/entity/new/*.entity{.ts,.js}'], //实体指向位置
      multipleStatements: true,
      dropSchema: false,
      autoLoadEntities: true, //自动加载实体结构
      synchronize: true, //同步数据
      logging: true, //是否打印sql语句
      logger: new DbLogger(),
      cache: false, //缓存
      connectTimeout: 20000, //连接超时时间
    }),
    //   name:'casbin',
    //   type: 'mysql',
    //   host: conf.mysql.host,
    //   port: conf.mysql.port,
    //   username: conf.mysql.username,
    //   password: conf.mysql.password,
    //   database: 'casbin',
    //   entities: [], //实体指向位置
    //   multipleStatements: true,
    //   dropSchema: false,
    //   autoLoadEntities: true, //自动加载实体结构
    //   synchronize: true, //同步数据
    //   cache: false, //缓存
    //   connectTimeout: 20000, //连接超时时间
    // }),
    RedisModule.forRoot({ config: conf.redis }, true),
    TypeOrmModule.forFeature([OperateLog], 'default'),
    JwtModules,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService, //jwt生成验证
    RedisService, //redis服务
    JwtStrategy, //jwt密钥，继承密码
    CasbinService, //权限操作服务
    ValidationPipe,//默认管道
    {
      provide: APP_FILTER,
      useClass: CustomException, //使用异常抛出
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,//统一返回格式
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,//错误捕捉拦截
    },
  ],

  exports: [JwtService, RedisService, CasbinService],
}) //{}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddle, JwthMiddleware,CasbinMidddleware).forRoutes('*');
  }
}
