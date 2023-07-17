import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CasbinService } from 'src/service/casbin.service';

@Injectable()
export class CasbinMidddleware implements NestMiddleware {
  constructor(private casbinService: CasbinService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    console.log('casbin中间件开始');
    // console.log('调用服务', await this.casbinService.findAllPolicy());
    // const url = req.originalUrl;
    next()
    console.log('casbin中间件结束');
  }

  // canActivate(context: ExecutionContext) {}
}
