import { User } from 'src/module/users/entity/user';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';


@Entity({ name: 'evaluate' })
export class Evaluate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    evaluate: string;

    @Column('int')
    rating: number;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 50 })
    date: string;

    @Column("varchar", { length: 36, nullable: true })
    userId: string;

    @ManyToOne(() => User, (user) => user.evaluate, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId' })
    user: User;
}
