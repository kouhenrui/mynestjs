import {
  Injectable,
  UnauthorizedException,
  NestMiddleware,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NextFunction, Request } from 'express';
import conf from 'src/config';
import { existIn } from 'src/config/utils/utils';
import { JwtService } from 'src/model/jwt/jwtService';

@Injectable()
export class JwthGuard extends AuthGuard('jwt') {
 
  constructor( private jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const url = context.switchToHttp().getRequest().url;
    const req = context.switchToHttp().getRequest();

    if (existIn(url, conf.writeUrl)) {
      return true;
    } else {
      if (req.headers['authorization']) {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const payload = this.jwtService.verify(token); // 验证 JWT Token，并获取解密后的 payload 数据
        req['user'] = payload; // 将解密后的 payload 数据保存在请求对象中，供后续处理使用
        return super.canActivate(context);
      } else throw new UnauthorizedException('token不为空');
    }
  }
  // use(req: Request, next: ()=>void) {
  //   // console.log(req)
  //   const url = req.baseUrl;
  //   console.log('请求路径为', url);

  //   console.log('卡在这了');

  //   next();
  // }
}
