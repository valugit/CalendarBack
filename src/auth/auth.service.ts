import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.checkLogin(username);

		if (user && crypto.createHmac('sha256', pass).digest('hex') === user[0].password) {
			const { password, ...result } = user[0];
			return result;
		}

		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async register(user: any) {
		if (!(user.email && user.username && user.password && user.role)) {
			return {
				status_code: 400,
				error: 'Some information is missing from the request.'
			};
		}
		// TODO: check email and maj/min/symbol
		if (typeof user.username !== 'string' || (user.username.length < 2 || user.username.length > 255)) {
			return {
				status_code: 400,
				error: 'The username must be between 2 and 255 characters.'
			};
		}
		if (typeof user.password !== 'string' || (user.password.length < 8 || user.password.length > 255)) {
			return {
				status_code: 400,
				error: 'The password must be between 8 and 255 characters.'
			};
		}
		if (user.role !== 'player' && user.role !== 'gamemaster') {
			return {
				status_code: 400,
				error: 'The role can be either \'player\' or \'gamemaster\', nothing else.'
			};
		}
		this.usersService.create(user);
		return {
			status_code: 201
		};
	}
}
