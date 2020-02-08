import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/users.entity';
import { Game } from '../games/games.entity';

@Entity({ name: 'seance' })
export class Seance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 1024 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(type => User, user => user.id)
    gamemaster: User;

    @ManyToOne(type => Game, game => game.id)
    seance_game: Game;

    @ManyToMany(type => User)
    @JoinTable()
    players: User[];

    @Column({ type: 'boolean' })
    mature: boolean;

    @Column({ type: 'timestamptz' })
    start: Date;

    @Column({ type: 'timestamptz' })
    end: Date;
}