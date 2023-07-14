import { Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthRegistDto, CreateAuthDto } from './dto/auth.dto';
import { JwtService } from '../jwt/jwtService';
import { RedisService } from 'src/service/redis.service';
import { Account } from 'src/entity/new/account.entity';
import { dtoToEntity } from 'src/config/utils/utils';
import { getSalt, hashPassword } from 'src/config/utils/cryptogram';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,

    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  async login(authLogin: AuthLoginDto): Promise<any> {
    const token = await this.jwtService.sign(authLogin);
    await this.redisService.set('token', token, 20);
    return token;
  }
  async register(authRegist: AuthRegistDto) {
    const account = new Account();
    dtoToEntity(authRegist, account);
    account.salt = await getSalt();
    account.password = await hashPassword(account.password, account.salt);
    return await this.accountRepository.save(account);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
