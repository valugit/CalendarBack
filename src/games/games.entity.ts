import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seance } from '../seances/seances.entity';

@Entity({ name: 'game' })
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    info: string;

    @OneToMany(type=>Seance, seance => seance.id)
    game_seances: Seance[];
}