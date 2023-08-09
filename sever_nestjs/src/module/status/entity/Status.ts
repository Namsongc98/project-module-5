import { Length } from 'class-validator';
import { Topic } from "src/module/topic/entity/topic";
import { User } from "src/module/users/entity/user";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "status" })
export class Status {

    @PrimaryGeneratedColumn()
    id:number;

    @Column("boolean", { default: true })
    status_beginner: boolean;

    @Column("boolean", { default: false })
    status_intermediate: boolean;

    @Column("boolean", { default: false })
    status_advanced: boolean;

    @Column("int", { default: 0 })
    poiter: number;

    @Column("varchar", { length: 36, nullable: true },)
    userId: string;

    @Column("int", { nullable: true })
    topicId: number;

    @ManyToOne(() => User, (user)=>user.statusTopic,{onDelete:"CASCADE"})
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Topic,(topic)=>topic.status,{onDelete:"CASCADE"})
    @JoinColumn({ name: "topicId" })
    topic: Topic;
}