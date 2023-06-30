import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../config/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // 从请求头中获取 JWT Token
    if (request.url == 'auth/login')return true
    if (!token) {
        throw new UnauthorizedException("token不为空")
    //   return false; // 没有提供 JWT Token，则不允许访问
    }

    try {
      const payload = this.jwtService.verify(token); // 验证 JWT Token，并获取解密后的 payload 数据
      request.user = payload; // 将解密后的 payload 数据保存在请求对象中，供后续处理使用
      return true; // 验证成功，允许访问
    } catch (error) {
      return false; // 验证失败，不允许访问
    }
  }
}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   canActivate(context: ExecutionContext) {
//     console.log('////////////')
//     const url = context.switchToHttp().getRequest().url
//     console.log(url)
//     if (url === 'auth/login') return true
//     return super.canActivate(context)
//   }
//   handleRequest(err, user, info) {
//     // console.log(user, err, '1users')
//     // You can throw an exception based on either "info" or "err" arguments
//     if (err || !user) {
//       throw new UnauthorizedException("用户未授权")
//     }
//     return user;
//   }

// }
