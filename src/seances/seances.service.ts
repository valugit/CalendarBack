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

        seance.date_start = info.date_start;
        seance.date_end = info.date_end;

        await this.seanceRepository.save(seance)
        .then(()=> {
            return {status: 201};
        })
        .catch(err => {
            return {status: 400, message: err};
        })
	}

	findAll(): Promise<Seance[]> {
		return this.seanceRepository.find();
    }

    findGmSeances(id: string): Promise<Seance[]> {
        return this.seanceRepository.find({where: {gamemaster: id}})
    }
}