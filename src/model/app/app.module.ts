import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { CustomException } from 'src/config/utils/error';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/config/utils/jwt';
import { JwtStrategy } from 'src/config/utils/jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // 替换为你的实际密钥
      signOptions: { expiresIn: '1h' }, // 设置 Token 的过期时间
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,JwtService, JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: CustomException,
    },
  ],

  exports:[JwtService]
})
export class AppModule {}
