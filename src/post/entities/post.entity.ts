import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostEntity{
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column()
    title: string;

    @Column()
    description: string;
     
    @Column()
    thumbnail: string;

    @Column({type: "int", default:1})
    status: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}