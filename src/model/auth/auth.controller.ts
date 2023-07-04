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
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '../jwt/jwtService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,

  ) {}

  @Post('/login')
  async create(@Req()req) {
    console.log("静茹到控制层",req.user)
    const u = { name: '张三', pwd: '111111' };
    return await this.jwtService.sign(u);
  }

  @Get('/info')
  async findAll(@Req()req) {
    
    return req.user
  }

  @Get('/p')
  async findOne() {
    return await this.jwtService.verify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwicHdkIjoiMTExMTExIiwiaWF0IjoxNjg4MzY4MTc3fQ.OhM3sIIHMbBjpFGaCR5S9052PVsduWPY3gG3aMLeoWg',
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
