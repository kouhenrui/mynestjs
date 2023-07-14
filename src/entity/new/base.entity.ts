import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({comment:"创建时间"})
  createdAt: Date;

  @UpdateDateColumn({comment:"修改时间"})
  updatedAt: Date;

  @DeleteDateColumn({comment:"删除时间"})
  deletedAt: Date;
}
