import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

export type Users = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    findOne(username: string): Promise<User[]> {
        return this.userRepository.find({where: {username: username}});
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}