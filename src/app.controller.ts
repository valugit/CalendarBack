import { Controller, Request, Get, Post, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Roles } from './roles/roles.decorator';
import { UsersService } from './users/users.service';
import { UserDto } from './users/users-create.dto';
import { SeancesService } from './seances/seances.service';
import { SeanceDto } from './seances/seances-create.dto';
import { GamesService } from './games/games.service';
import { GameDto } from './games/games-create.dto';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly seancesService: SeancesService,
        private readonly gamesService: GamesService
    ) { }

    @Post('auth/register')
    async register(@Body() body: UserDto) {
        return this.authService.register(body);
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/profile')
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.username);
    }

    // Routes for normal user :
    @UseGuards(AuthGuard('jwt'))
    @Get('gamemaster/all')
    getGms() {
        // get all gms
        return this.usersService.findGms();
        // TODO: add number of player registered for each seance instead of array of players
        // maybe later 'cause I couldn't find how to do this w/ the request :/
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Get('user/reservations')
    getReservations(@Request() req) {
        // get users reservation
        return this.usersService.findReservations(req.user);
        // TODO: Does this work ?
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Post('seance/join')
    joinSeance(@Request() req) {
        // take a reservation
        return this.seancesService.joinSeance(req.user, req.body);
        // TODO: This does NOT work
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('gamemaster/:id')
    getOneGms(@Param() params) {
        // get gms disponibilities
        return this.usersService.findGmSeances(params.id);
        // TODO: add number of player registered for each seance
        // TODO: return gm info
        // TODO: return only future seances
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('game/all')
    getGames(@Request() req, @Param() params) {
        // get all games
        return this.gamesService.findAll();
    }

    // Routes for seller :
    @UseGuards(AuthGuard('jwt'))
    @Roles('gamemaster')
    @Post('seance/add')
    async addSeance(@Body() body: SeanceDto, @Request() req) {
        // add disponibility
        const seanceCreated = await this.seancesService.create(body, req.user);

        if (seanceCreated) {
            return { status: 400, message: seanceCreated };
        } else {
            return { status: 201 };
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('gamemaster')
    @Post('seance/remove')
    async removeSeance(@Body() body) {
        // remove gamemasters's own disponibility
        // TODO: return this.seancesService.delete(body);
    }

    // Routes for admin only
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @Post('game/add')
    async addGame(@Body() body: GameDto) {
        // add game
        const gameCreated = await this.gamesService.create(body);

        if (gameCreated) {
            return { status: 400, message: gameCreated };
        } else {
            return { status: 201 };
        }
    }
}
