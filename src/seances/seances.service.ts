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

		seance.gamemaster = info.gamemaster;
		// seance.email = info.email;
		// seance.salt = 'salty';
		// seance.role = info.role;
		// seance.birthdate = info.birthdate;

		// await this.seanceRepository.save(seance);
	}

	findAll(): Promise<Seance[]> {
		return this.seanceRepository.find();
    }

    findGmSeances(id: string): Promise<Seance[]> {
        return this.seanceRepository.find({where: {gamemaster: id}})
    }
}