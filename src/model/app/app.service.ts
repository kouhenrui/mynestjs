import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';
import conf from 'src/config';
import { getCaptcha } from 'src/config/utils/captcha';
import { makeRandonString } from 'src/config/utils/cryptogram';
import { RedisService } from 'src/service/redis.service';
@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}
  //返回图片验证码
  async getCaptcha() {
    const captcha = await getCaptcha();
    const id = await makeRandonString(4);
    this.redisService.set('captcha:' + id, captcha.text,conf.redisExp.captchaExp);
    console.log(captcha.data, captcha.text);
    return { id, svg: captcha.data };
  }
  async getHello() {
    const captcha = await getCaptcha();
    const id = await makeRandonString(4);
    this.redisService.set('captcha:' + id, captcha.text);
    console.log(captcha.data, captcha.text);
    return { id, svg: captcha.data };

    // const salt=await getSalt()
    // const haspwd=await hashPassword("123456",salt)
    // const match=await comparePassword("123456",haspwd)
    // console.log("加密演",salt,"加密密码",haspwd,"密码一致性",match)
    // return {salt,haspwd,match}
    //  return encrypt()
  }
  async ls() {}
}
