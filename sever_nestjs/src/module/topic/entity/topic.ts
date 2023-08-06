import { Question } from 'src/module/question/entity/question';
import { User } from 'src/module/users/entity/user';

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

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

  @Column("boolean", { default: false })
  status: boolean;

  @OneToMany(() => Question, (question) => question.topic, { cascade: true })
  questions: Question[]

  @ManyToMany(() => User, (user) => user.topic, { onDelete: 'CASCADE', })
  user: User[];
}