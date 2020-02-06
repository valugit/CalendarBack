import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './games.entity';

@Injectable()
export class GamesService {
    constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    ) {}

    findAll(): Promise<Game[]> {
        return this.gameRepository.find();
    }

    async create(info: any) {

        const game = new Game();

        game.name = info.name;
        game.info = info.info;
        game.color = info.color;

        var check;

        await this.gameRepository.save(game)
            .catch(err => {
                check = err;
            });
        return check;
    }
}