import { Module } from '@nestjs/common';
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
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: conf.mysql.host,
      port: conf.mysql.port,
      username: conf.mysql.username,
      password: conf.mysql.password,
      database: conf.mysql.database,
      entities: [__dirname + '/**/**/**/entity/*.entity{.ts,.js}'],
      multipleStatements: true,
      dropSchema: false,
      synchronize: true, //同步数据
      logging: true,
      logger: new DbLogger(),
      cache: false,
      connectTimeout: 20000,
    }),
    RedisModule.forRoot({ config: conf.redis }, true),
    MongooseModule.forRoot('mongodb://192.168.245.22/test',{connectionName:'log'}),
  
    JwtModules,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: CustomException,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalPrefix,//同统一前缀地址
    // },
  ],

  exports: [JwtService],
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwthGuard).forRoutes('*');
//   }
// }
