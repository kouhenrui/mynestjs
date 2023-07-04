import {MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/model/jwt/jwt.strategy';
import conf from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from './jwtService';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: conf.jwt.secretKey, // 替换为你的实际密钥
      signOptions: { expiresIn: '24h' }, // 设置 Token 的过期时间
    }),
  ],
  providers: [ JwtStrategy,JwtService],
  exports: [JwtService],
})
export class JwtModules {}

// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwthGuard).forRoutes('*');
//   }
// }
