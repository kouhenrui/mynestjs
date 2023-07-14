import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('group')
export class Group extends Base {
  constructor() {
    super();
    this.name = undefined;
  }

  @Column({ comment: '名称'})
  name: string;

  @Column({ comment: '管理者编号'})
  manager_id: string;

  @Column({ comment: '描述', nullable: true })
  description: string;
}
