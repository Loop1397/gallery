import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

//@Unique 데코레이터 : 필드 중 임의로 유니크한 값 지정 가능
@Entity()
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_number: number;

    @Column()
    user_id: string;

    @Column()
    password: string;
}