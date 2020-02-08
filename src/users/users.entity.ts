import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, Index, JoinTable } from 'typeorm';
import { Seance } from '../seances/seances.entity';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @Index({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    @Index({ unique: true })
    username: string;

    @Column({ type: 'date', nullable: true })
    birthdate: Date | null;

    @Column({ type: 'varchar', length: 255, select: false })
    password: string;

    @Column({ type: 'varchar', length: 255 })
    role: string;

    @OneToMany(type => Seance, seance => seance.gamemaster)
    gm_seances: Seance[];
}