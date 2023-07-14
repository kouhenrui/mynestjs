import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @InjectRedis() private readonly redis: Redis
  ) { }

  /**
   * @description 存入键值对，可设置缓存时间
   * @author  
   * @Date:
   */
  async set(key: string, value: any, seconds?: number): Promise<any> {
    value = JSON.stringify(value);
    if (!seconds) {
      await this.redis.set(key, value);
    } else {
      await this.redis.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @Description: 设置获取redis缓存中的值
   * @param key {String}
   */
  async get(key: string): Promise<any> {
    const data = await this.redis.get(key);
    // const data = await this.client.hgetall(key);
    if (data) return JSON.parse(data);
    return null;
  }

  /**
   * @Description: 根据key删除redis缓存数据
   * @param key {String}
   * @return:
   */
  async del(key: string): Promise<any> {
    return await this.redis.del(key);
  }

  /**
   * @description 判断缓存是否存在
   * @author khr
   * @Date: 
   */
  async exists(key: string): Promise<any> {
    return await this.redis.exists(key);
  }

  /**
   * @Description: 清空redis的缓存
   * @param {type}
   * @return:
   */
  async flushall(): Promise<any> {
    return await this.redis.flushall();
  }
}
