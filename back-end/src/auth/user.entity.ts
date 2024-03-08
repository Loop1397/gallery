import { Board } from "src/board/board.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

// @Unique 데코레이터 : 필드 중 임의로 유니크한 값 지정 가능
// 유니크한 값으로 지정된 컬럼에 동일한 값이 들어오려고 하면 500에러 발생
@Entity()
@Unique(['user_id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_number: number;

    @Column()
    user_id: string;

    @Column()
    password: string;

    // user와 board의 관계성을 만들어주기위한 컬럼
    // 한 user가 여러 board를 만들 수 있기에 OneToMany Relationship
    // eager가 true면 user entity를 가져올 때 board entity도 같이 가져옴 
    @OneToMany(type => Board, board => board.user, { eager: true})
    boards: Board[];

    // DB에 생성된 시간
    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    // 논리삭제용 컬럼
    // nullable의 default값은 true로 보임
    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at: Date;
}