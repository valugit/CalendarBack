import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as crypto from 'crypto';

export type Users = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async create(info: any): Promise<any> {
        const user = new User();

        user.username = info.username;
        user.email = info.email;
        user.password = crypto.createHmac('sha256', info.password).digest('hex');
        user.role = info.role;
        user.birthdate = info.birthdate;

        var check;

        await this.userRepository.save(user).catch((err) => {
            check = err;
        });
        return check;
    }

    findOne(username: string): Promise<User[]> {
        return this.userRepository.find({
            select: ['id', 'username', 'email', 'role', 'birthdate'],
            where: { username: username }
        });
    }

    async checkLogin(username: string): Promise<User> {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('username = :name', { name: username })
            .addSelect('user.password')
            .getOne();
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }


    async findGmSeances(id: string): Promise<User> {
        const qb = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.gm_seances', 'seance')
            .leftJoinAndSelect('seance.seance_game', 'seance_game')
            .leftJoinAndSelect('seance.players', 'players')
            .where('user.id = :number', { number: id })
            .andWhere('seance.start > now()')
            .getOne();

        return qb;
    }

    async findGms(): Promise<User[]> {
        const qb = await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'user.username',
                'seance.id',
                'seance.title',
                'seance.start',
                'seance.end',
                'game.name'
            ])
            .leftJoinAndSelect('user.gm_seances', 'seance')
            .leftJoinAndSelect('seance.seance_game', 'game')
            .leftJoinAndSelect('seance.players', 'players')
            .where("seance.start > now()")
            .getMany();

        return qb;
    }

    async findReservations(user: any) {
        return await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.player_seances', 'seance')
            .getMany();
    }
}
