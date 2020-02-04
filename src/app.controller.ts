import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Roles } from './roles/roles.decorator';
// import { Roles } from './roles/roles.decorator';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}

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
    @Get('sellers')
    getSellers(@Request() req) {
        // get all sellers
        return
    }
	// get sellers disponibilities
	// get users reservation
	// take a reservation

	// Routes for seller :
	// get all dispo
	// add disponibility
	// remove disponibility
}
