import { IsString } from 'class-validator';

export class CreateAuthDto {}

export class AuthLoginDto {
  @IsString({ message: '账号不为空' })
  phone: string;
  @IsString({ message: '密码不为空' })
  password: string;
}

export class AuthRegistDto {
  @IsString({ message: '账号不为空' })
  phone: string;
  @IsString({ message: '密码不为空' })
  password: string;
}
