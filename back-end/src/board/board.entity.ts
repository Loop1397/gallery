import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    // 게시글을 작성한 user의 정보가 들어가도록 바뀌었으니 author는 더 이상 필요없음
    // @Column()
    // author: string;

    @Column()
    status: BoardStatus;

    // user와 board의 관계성을 만들어주기위한 컬럼
    // 한 user가 여러 board를 만들 수 있기에 OneToMany Relationship
    // eager가 true면 user entity를 가져올 때 board entity도 같이 가져옴 
    // 해당 컬럼의 이름은 user + user의 프라이머리키의 형태로 저장됨
    // 여기서는 userUserNumber라는 외래키가 추가됨
    // @JoinColumn이란 데코레이터를 통하여 저장될 외래키의 컬럼명을 직접 지정할수도 있음 (https://marklee1117.tistory.com/45)
    @ManyToOne(type => User, user => user.boards, {eager: false})
    @JoinColumn({ name: 'user'})
    user: User;

    //DB에 들어가는 시간
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' }) 
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at: Date;
}
    // Tags: ;