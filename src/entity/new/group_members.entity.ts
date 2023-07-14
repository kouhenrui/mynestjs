import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';
export enum Types {"vendor","tenant"}
@Entity('group_members')
export class GroupMemmbers extends Base {
  constructor() {
    super();
    this.group_id = undefined;
  }
  @Column({ comment: '组编号'})
  group_id: string;

  @Column({ comment: '类型'})
  type: Types;


  @Column({ comment: '组员标识'})
  member_num: string;

}
