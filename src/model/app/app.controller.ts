import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MongoRbacService } from 'src/model/mongo/mongo.service';
import { sign } from 'src/config/utils/cryptogram';
// import { CasbinService } from '../casbin/casbin.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private casbinService: CasbinService
  ) // private mongoRbacService:MongoRbacService,
  {}

  @Get('/get/gaptcha')
  async getCaptcha(): Promise<any> {
    return await this.appService.getCaptcha();
  }

  @Get('/test')
  async getHello() {
    
    return await sign();
    // const data=["root","all","password"]
    // return await this.mongoRbacService.createRbac(data)
    // return await this.appService.getHello()
  }
}
