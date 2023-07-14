import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CasbinService } from 'src/service/casbin.service';

@Injectable()
export class CasbinMidddleware implements CanActivate {
  constructor(private casbinService: CasbinService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('实现全局中间件');
    console.log('调用服务', this.casbinService.findAllPolicy());
    return true;
    //   throw new Error("Method not implemented.");
  }

  // canActivate(context: ExecutionContext) {}
}
