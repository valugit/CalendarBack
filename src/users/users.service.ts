import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as crypto from 'crypto';

export type Users = any

@Injectable()
export class UsersService {
	private readonly users: User[]

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	async create(info: any) {
		const user = new User();

		user.username = info.username;
		user.email = info.email;
		user.password = crypto.createHmac('sha256', info.password).digest('hex');
		user.salt = 'salty';
		user.role = info.role;
		user.birthdate = info.birthdate;

		await this.userRepository.save(user);
	}

	findOne(username: string): Promise<User[]> {
		return this.userRepository.find({ where: { username: username } });
	}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findGms(): Promise<User[]> {
		return this.userRepository.find({select: ['id', 'username'], where: {role: 'gamemaster'}});
	}
}
