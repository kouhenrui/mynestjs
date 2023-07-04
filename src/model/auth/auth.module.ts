import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '../jwt/jwtService';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtService],
  
})
export class AuthModule {}
