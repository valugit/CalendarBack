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

	findAll(): Promise<Seance[]> {
		return this.seanceRepository.find();
    }

    findGmSeances(id: string): Promise<Seance[]> {
        return this.seanceRepository.find({where: {gamemaster: id}})
    }
}