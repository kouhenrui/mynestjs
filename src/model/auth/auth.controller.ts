import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegistDto, CreateAuthDto } from './dto/auth.dto';
import { JwtService } from '../jwt/jwtService';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService){}
  @Post('/regist')
  async regist(@Body() authRegist: AuthRegistDto) {
    return await this.authService.register(authRegist);
  }
  @Post('/login')
  async login(@Body() authLogin: AuthLoginDto) {
    return await this.authService.login(authLogin);
  }

  @Get('/info')
  async findAll(@Req() req) {
    return req.user;
  }

  @Get('/p')
  async findOne() {
    // return await this.jwtService.verify(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwicHdkIjoiMTExMTExIiwiaWF0IjoxNjg4MzY4MTc3fQ.OhM3sIIHMbBjpFGaCR5S9052PVsduWPY3gG3aMLeoWg',
    // );
  }

  @Patch(':id')
  update(@Param('id') id: string) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
