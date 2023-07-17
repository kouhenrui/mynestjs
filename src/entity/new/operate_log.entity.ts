import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('operate_log')
export class OperateLog extends Base {
  constructor() {
    super();

    this.ip = undefined;
    this.url = undefined;
    this.method = undefined;
    this.status = undefined;
    this.level = undefined;
    this.name = undefined;
    this.role = undefined;
  }
  @Column({ comment: 'ip地址' })
  ip: string;

  @Column({ comment: '请求地址' })
  url: string;

  @Column({ comment: '请求方法' })
  method: string;

  @Column({ comment: '响应状态', nullable: true })
  status: string;

  @Column({ comment: '日志等级' })
  level: string;

  @Column({ comment: '名称', nullable: true })
  name: string;

  @Column({ comment: '权限', nullable: true })
  role: string;
}
