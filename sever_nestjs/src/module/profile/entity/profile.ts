import { Length } from 'class-validator';
import { User } from 'src/module/users/entity/user';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 50, nullable: true })
    firstName: string;

    @Column("varchar", { length: 50, nullable: true })
    lastName: string;

    @Column("varchar", { length: 20, nullable: true })
    phone: string;

    @Column("varchar", { length: 20, nullable: true })
    age: string;

    @Column("varchar", { length: 10, nullable: true })
    gender: string

    @Column("longtext", { nullable: true })
    avatar: string;

    @Column("varchar", { length: 36 })
    userId: string;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "userId" })
    user: User
}

export { Profile }