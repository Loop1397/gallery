import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth extends BaseEntity {
    @PrimaryGeneratedColumn()
    userNumber: number;

    @Column()
    userId: string;

    @Column()
    password: string;
}