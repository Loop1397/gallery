import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File extends BaseEntity {
    @PrimaryGeneratedColumn()
    file_number: number;

    @Column()
    file_name: string;

    @Column()
    file_path: string;
    
    @Column()
    mime_type: string;

    @CreateDateColumn()
    created_at: Date;
} 