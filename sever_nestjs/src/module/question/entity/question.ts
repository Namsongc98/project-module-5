import { Topic } from "src/module/topic/entity/topic";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "question" })
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    question: string;

    @Column("varchar", { length: 255 })
    option_a: string;

    @Column("varchar", { length: 255 })
    option_b: string;

    @Column("varchar", { length: 255 })
    option_c: string;

    @Column("varchar", { length: 255 })
    option_d: string;

    @Column("varchar", { length: 50 })
    answer: string;

    @Column("boolean", { default: false })
    status: boolean

    @Column("int", { default: 0 })
    point: number

    @Column("int")
    topicId: number

    @ManyToOne(() => Topic, (topic) => topic.questions,{onDelete: 'CASCADE'})
    topic: Topic
}