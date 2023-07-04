import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import conf from 'src/config';
import { CustomException } from 'src/config/utils/error';

@Injectable()
export class JwtService {
  async sign(payload: any): Promise<string> {
    return  jwt.sign(payload, conf.jwt.secretKey); // 签发 JWT
  }

  async verify(token: string): Promise<any> {
    try {
      return jwt.verify(token, conf.jwt.secretKey); // 验证 JWT 的有效性并返回解密后的 payload 数据
    } catch (error) {
      throw new CustomException('Invalid token'); // 抛出异常，表示 JWT 验证失败
    }
  }
}
