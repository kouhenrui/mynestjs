import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '../jwt/jwtService';
import { RedisService } from 'src/service/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entity/new/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account], 'default')],
  controllers: [AuthController],
  providers: [AuthService, JwtService, RedisService],
})
export class AuthModule {}
