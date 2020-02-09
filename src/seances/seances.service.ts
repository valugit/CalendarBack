import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seance } from './seances.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class SeancesService {
    constructor(@InjectRepository(Seance) private readonly seanceRepository: Repository<Seance>) { }

    async create(info: any, user: any) {
        const seance = new Seance();

        seance.title = info.title;
        if (info.description != "") {
            seance.description = info.description;
        }
        seance.gamemaster = user.id;
        seance.seance_game = info.seance_game;
        seance.mature = true;

        if (!info.mature) {
            seance.mature = false;
        }

        seance.start = info.start;
        seance.end = info.end;

        var check;

        await this.seanceRepository.save(seance).catch((err) => {
            check = err;
        });
        return check;
    }

    findAll(): Promise<Seance[]> {
        return this.seanceRepository.find();
    }

    async joinSeance(user, info) {
        const check = await this.seanceRepository
            .createQueryBuilder()
            .relation(User, 'player_seances')
            .of(user.id)
            .loadOne();

        console.log(check);
        if (check) {
            console.log('already in db');
            return { status: 400, message: 'User already registered for this seance.' };
        } else {
            console.log('not in db');

            const seanceJoined = await this.seanceRepository
                .createQueryBuilder()
                .relation(User, 'player_seances')
                .of(user.id)
                .add(info.seance_id);

            console.log(seanceJoined);

            // if (seanceJoined) {

            // }
        }
        // 	seanceJoined
        // 		.then(() => {
        // 			console.log('seance.then')
        // 			return { status: 201 }
        // 		})
        // 		.catch((err) => {
        // 			console.log('seance.catch')
        // 			return { status: 400, message: err }
        // 		})
        // })
    }

    async delete(user, info): Promise<Boolean> {
        const check = await this.seanceRepository.createQueryBuilder('seance')
            .where('seance.gamemaster = :user_id', { user_id: user.id })
            .andWhere('seance.id = :seance_id', { seance_id: info.seance_id })
            .getOne();

        if (check) {
            const del = await this.seanceRepository.createQueryBuilder('seance')
                .delete()
                .from(Seance)
                .where("id = :seance_id", { seance_id: info.seance_id })
                .execute();

            return true;
        } else {
            return false;
        }

    }
}
