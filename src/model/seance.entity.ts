import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from "./user.entity"
import { Game } from "./game.entity"

@Entity({ name: 'seance' })
export class Seance {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    gamemaster: User;

    @ManyToOne(type => Game, game => game.id)
    game: Game;

    @ManyToMany(type => User)
    @JoinTable()
    players: User[];

    @Column({ type: 'boolean' })
    mature: boolean;

    @Column({ type: 'timestamptz' })
    date_start: Date;

    @Column({ type: 'timestamptz' })
    date_end: Date;
}