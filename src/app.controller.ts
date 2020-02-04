import { Controller, Request, Get, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Roles } from './roles/roles.decorator';
import { UsersService } from './users/users.service';
import { SeancesService } from './seances/seances.service';
// import { Roles } from './roles/roles.decorator';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly seancesService: SeancesService
    ) {}

	@Post('auth/register')
	async register(@Request() req) {
		return this.authService.register(req.body);
	}

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('user/profile')
	getProfile(@Request() req) {
		return req.user;
	}

	// @Roles('admin')

    // Routes for normal user :
    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Get('gamemaster/all')
	getGms(@Request() req) {
		// get all gms
		return this.usersService.findGms();
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('player')
    @Get('gamemaster/:id')
	getOneGms(@Request() req, @Param() params) {
        // get gms disponibilities
		return this.seancesService.findGmSeances(params.id);
	}
	// get users reservation
	// take a reservation

	// Routes for seller :
	// get all dispo
	// add disponibility
	// remove disponibility
}
