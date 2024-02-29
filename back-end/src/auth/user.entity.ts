import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}