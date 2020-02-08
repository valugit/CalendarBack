import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { SeancesService } from './seances/seances.service';
import { GamesService } from './games/games.service';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly seancesService: SeancesService,
        private readonly gamesService: GamesService
    ) { }


    getHello(): string {
        return 'Hello World!';
    }

    filldb() {
        const check = this.usersService.findOne('user');

        if (!check) {
            const user = {
                username: 'user',
                email: 'user@user.com',
                password: crypto.createHmac('sha256', 'Userpa55').digest('hex'),
                role: 'player'
            };
            this.usersService.create(user);

            const dnd = {
                name: 'Dungeon & Dragons',
                info: 'Popular medieval fantasy rpg',
                color: '#ff8c00'
            };
            this.gamesService.create(dnd);
            const path = {
                name: 'Pathfinder',
                info: 'AKA Dungeons & Dragons 3.0',
                color: '#ff5555'
            };
            this.gamesService.create(path);
            const cthu = {
                name: 'Cthulhu',
                info: 'Horror rpg',
                color: '#005438'
            };
            this.gamesService.create(cthu);
            const home = {
                name: 'Homebrew',
                info: 'Self created system and campaign',
                color: '#9ec0ff'
            };
            this.gamesService.create(home);
        }
    }
}
