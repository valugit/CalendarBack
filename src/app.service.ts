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

    compareDates(iso1: string, iso2: string): Boolean {

        const d1 = new Date(iso1);
        const d2 = new Date(iso2);

        if (d1 < d2) {
            return true;
        } else {
            return false;
        }
    }
}
