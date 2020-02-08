import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seance } from './seances.entity';

@Injectable()
export class SeancesService {
    constructor(
    @InjectRepository(Seance)
    private readonly seanceRepository: Repository<Seance>,
    ) {}

    async create(info: any) {
        const seance = new Seance();

        seance.title = info.title;
        seance.gamemaster = info.gamemaster;
        seance.seance_game = info.seance_game;
        seance.mature = true;

        if (!info.mature) {
            seance.mature = false;
        }

        seance.start = info.start;
        seance.end = info.end;

        var check;

        await this.seanceRepository.save(seance)
            .catch(err => {
                check = err;
            });
        return check;
    }

    findAll(): Promise<Seance[]> {
        return this.seanceRepository.find();
    }

    findGmSeances(id: string): Promise<Seance[]> {
        return this.seanceRepository.find({relations: ['seance_game'], where: {gamemaster: id}});
    }
}