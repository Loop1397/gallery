import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BoardStatus } from "./board.model";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    author: string;

    @Column()
    status: BoardStatus;

    // user와 board의 관계성을 만들어주기위한 컬럼
    // 한 user가 여러 board를 만들 수 있기에 OneToMany Relationship
    // eager가 true면 user entity를 가져올 때 board entity도 같이 가져옴 
    @ManyToOne(type => User, user => user.boards, {eager: false})
    user: User;

    //DB에 들어가는 시간
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' }) 
    updated_at: Date;
}
    // lastModifiedDate: Date;
    // Tags: ;