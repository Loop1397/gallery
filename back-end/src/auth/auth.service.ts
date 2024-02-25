import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { create } from 'node:domain';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createUser(createAuthDto: CreateAuthDto): Promise <void> {
        return this.authRepository.createUser(createAuthDto);
    }

    async deleteUserById(userId: string): Promise <void> {
        return this.authRepository.deleteUserById(userId);
    }

    getUserInfoById(userId: string) {
        return this.authRepository.getUserInfoById(userId);
    }

    async login(createAuthDto: CreateAuthDto): Promise<object>{
        const { userId, password } = createAuthDto;
        const found = await this.authRepository.login(userId);

        if (found && found.password === password) {
            return found;
        } else {
            return { message : "Login failed!!" };
        }   
    }
}
