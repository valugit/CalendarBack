import { Controller, Request, Get, Post, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Roles } from './roles/roles.decorator';
import { UsersService } from './users/users.service';
import { UserDto } from './users/users-create.dto';
import { SeancesService } from './seances/seances.service';
import { SeanceDto } from './seances/seances-create.dto';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly seancesService: SeancesService
    ) {}

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

	// @Roles('admin')

    // Routes for normal user :
    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Get('gamemaster/all')
	getGms(@Request() req) {
		// get all gms
        return this.usersService.findGms();
        // add next seances planned in 7 following days
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Get('user/reservation')
	getReservations(@Request() req) {
		// get users reservation
		// return this.usersService.findRes();
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Post('seance/join')
	joinSeance(@Request() req) {
		// take a reservation
		// return
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('gamemaster/:id')
	getOneGms(@Request() req, @Param() params) {
        // get gms disponibilities
		return this.seancesService.findGmSeances(params.id);
	}

    // Routes for seller :
    @UseGuards(AuthGuard('jwt'))
    @Roles('gamemaster')
	@Post('seance/add')
	async addSeance(@Body() body: SeanceDto) {
        // add disponibility
		return this.seancesService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('gamemaster')
	@Post('seance/remove')
	async removeSeance(@Body() body) {
        // remove gamemasters's own disponibility
		// return this.seancesService.delete(body);
	}
}
