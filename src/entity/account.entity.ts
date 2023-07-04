import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('account')
export class Account extends Base {
  constructor() {
    super();
    this.name = undefined;
    this.salt = undefined;
    this.password = undefined;
    this.phone = undefined;
    this.type = undefined;
    this.access_token = undefined;
  }

  @Column({ comment: '名称' })
  name: string;
  @Column({ comment: '加密盐', nullable: false })
  salt: string;
  @Column({ comment: '密码', nullable: false })
  password: string;
  @Column({ comment: '手机号码', nullable: false })
  phone: string;
  @Column({ comment: '类型' })
  type: string;
  @Column({ comment: '状态参数' })
  access_token: string;
}
