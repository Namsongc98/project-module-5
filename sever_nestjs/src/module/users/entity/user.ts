import { Topic } from 'src/module/topic/entity/topic';
import { JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Evaluate } from 'src/module/evaluate/entity/evaluate';
import { Profile } from 'src/module/profile/entity/profile';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    JoinTable,
    PrimaryColumn,
    OneToOne,

} from 'typeorm';
import { CreateUserDto } from '../dto/CreateUser.dto';
@Entity({ name: 'user' })
export class User {
    constructor(createUserDto: CreateUserDto) {
        Object.assign(this, createUserDto)
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 50, unique: true })
    email: string;

    @Exclude()
    @Column("varchar", { length: 65 })
    password: string;

    @Column('varchar', { default: "user" })
    role: string;

    @Column("boolean", { default: true })
    status: boolean;

    @OneToMany(() => Evaluate, (evaluate) => evaluate.user, { cascade: true })
    evaluate: Evaluate[];
}