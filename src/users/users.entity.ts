import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seance } from '../seances/seances.entity';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'date', nullable: true })
    birthdate: Date | null;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255 })
    salt: string;

    @Column({ type: 'varchar', length: 255 })
    role: string;

    @OneToMany(type=>Seance, seance => seance.id)
    gm_seances: Seance[];
}