import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('login_log')
export class LoginLog extends Base {
  constructor() {
    super();

    this.name = undefined;

    this.account = undefined;
    this.role = undefined;
  }
  @Column({ comment: '名称', nullable: true })
  name: string;

  @Column({ comment: '账号' })
  account: string;

  @Column({ comment: '名称', nullable: true })
  role: string;
}
