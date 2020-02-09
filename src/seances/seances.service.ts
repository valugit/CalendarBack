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
        const seanceExists = await this.seanceRepository.createQueryBuilder('seance')
            .where('seance.id = :seance_id', { seance_id: info.seance_id })
            .andWhere('seance.start > now()')
            .getOne();

        if (!seanceExists) {
            return { status: 404, message: 'Seance does not exist or is already past.' };
        }

        console.log('seance exists.');

        const joined = await this.seanceRepository.createQueryBuilder('seance')
            .leftJoinAndSelect('seance.players', 'players')
            .where('seance.id = :seance_id', { seance_id: info.seance_id })
            .getOne();

        if (joined.players.length >= 8) {
            return { status: 404, message: 'Too many players are already registered for this seance.' };
        } else if (joined.players.map(u => u.id).indexOf(user.id) > -1) {
            return { status: 404, message: 'This user already joined the seance.' };
        }

        console.log('joining seance...');

        const joining = await this.seanceRepository.createQueryBuilder()
            .relation(Seance, 'players')
            .of(await this.seanceRepository.findOne({ where: { id: info.seance_id } }))
            .add(user.id);

        if (joining != undefined) {
            return { status: 404, message: 'Error trying to join the seance.' };
        }

        return { status: 200, message: 'Seance joined' };
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
