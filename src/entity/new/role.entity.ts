import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('role')
export class Role extends Base {
  constructor() {
    super();
    this.name = undefined;
  }

  @Column({ comment: '名称'})
  name: string;

}
