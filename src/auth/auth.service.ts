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

        if (await this.usersService.exists({key: "username", value: user.username})) {
            return {
                status_code: 400,
                error: 'This username is already taken.'
            };
        }

        if (await this.usersService.exists({key: "email", value: user.email})) {
            return {
                status_code: 400,
                error: 'This email is already registered.'
            };
        }

		this.usersService.create(user);
		return {
			status_code: 201
		};
	}
}
