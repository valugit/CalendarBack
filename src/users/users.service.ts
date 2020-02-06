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

    async create(info: any): Promise<any>{
        const user = new User();

        user.username = info.username;
        user.email = info.email;
        user.password = crypto.createHmac('sha256', info.password).digest('hex');
        user.role = info.role;
        user.birthdate = info.birthdate;

        var check;

        await this.userRepository.save(user)
            .catch(err => {
                check = err;
            });
        return check;
    }

    findOne(username: string): Promise<User[]> {
        return this.userRepository.find({select: ['id', 'username', 'email', 'role', 'birthdate'], where: { username: username } });
    }

    checkLogin(username: string): Promise<User[]> {
        return this.userRepository.find({where: { username: username } });
    }

    async exists(param: {key: string, value: string}): Promise<Boolean> {
        const item = await this.userRepository
            .createQueryBuilder('user')
            .andWhere(`"${param.key}" = "${param.key}"`)
            .getCount();

        console.log(`"${param.key}" = "${param.value}"`);
        console.log(item);

        return true;
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findGms(): Promise<User[]> {
        return this.userRepository.find({select: ['id', 'username'], relations: ['gm_seances'], where: {role: 'gamemaster'}});
    }
}
