import { Question } from 'src/module/question/entity/question';
import { Status } from 'src/module/status/entity/Status';
import { User } from 'src/module/users/entity/user';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'topic' })
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 50 })
  lever: string;

  @Column("varchar", { length: 100 })
  target: string;

  @Column("varchar", { length: 100 })
  image: string;

  @OneToMany(() => Question, (question) => question.topic, { cascade: true })
  questions: Question[];

  @OneToMany(() => Status, (status) => status.topic, { cascade: true })
  status: Status[];
}