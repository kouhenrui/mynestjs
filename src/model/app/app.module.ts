import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomException } from 'src/config/utils/error';
import { JwtStrategy } from 'src/model/jwt/jwt.strategy';
import { JwtModules } from '../jwt/jwt.module';
import { JwtService } from '../jwt/jwtService';
import { GlobalPrefix } from 'src/config/global.profiex';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis'
import conf from 'src/config';
import { DbLogger } from 'src/config/log4js';
import { join } from 'path';
const entities=join(__dirname+'../../entity/*.entity{.ts,.js}')
console.log("下载的位置",entities,__dirname)
// const EntityPath = join(__dirname + '/../../src/entity/*.entity{.ts,.js}');
const mysqlConfig:TypeOrmModuleOptions ={
  type: "mysql",
  host: conf.mysql.host,
  port: conf.mysql.port,
  username: conf.mysql.name,
  password: conf.mysql.password,
  database: conf.mysql.database,
  charset: conf.mysql.charset,
  entities: [entities],
  multipleStatements: true,
  dropSchema: false,
  synchronize: false, //同步数据
  logging: true,
  logger: new DbLogger(),
  cache: false,
  connectTimeout: 20000,
}
@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    RedisModule.forRoot({config:conf.redis},true),
    // ClickHouseModule.forRoot(conf.click_house),
    JwtModules,AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,JwtService, JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: CustomException,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GlobalPrefix,//同统一前缀地址
    // },
  ],

  exports:[JwtService]
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwthGuard).forRoutes('*');
//   }
// }
