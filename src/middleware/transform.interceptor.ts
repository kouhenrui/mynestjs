import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../config/log4js';
import { CasbinService } from 'src/service/casbin.service';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private casbinService: CasbinService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const allPolicies = await this.casbinService.findAllPolicy();
    console.log('获取所有角色及权限', allPolicies);

    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = JSON.stringify({
          IP: req.ip,
          user: req.user,
          res_url: req.originalUrl,
          res_method: req.method,
        });
        Logger.access(logFormat);
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
