import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
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
import { MongoRbacService } from 'src/model/mongo/mongo.service';
import { MongoModule } from '../mongo/mongo.module';
import { CasbinService } from 'src/service/casbin.service';
console.log("appmodule调用casbin")
@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    MongoModule,
    JwtModules,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,//jwt生成验证
    RedisService,//redis服务
    JwtStrategy,//jwt密钥，继承密码
    CasbinService,//权限操作服务
    {
      provide: APP_FILTER,
      useClass: CustomException, //使用异常抛出
    },
  ],

  exports: [JwtService, RedisService, CasbinService],
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwthGuard).forRoutes('*');
//   }
// }
