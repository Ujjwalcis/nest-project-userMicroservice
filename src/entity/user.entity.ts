import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    userName: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'boolean' })
    isAlive: boolean;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
}