import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getUserInfoById(userId: string) {
        // findOneBy를 사용해서 데이터를 갖고오기만 할거라면 레포지토리가 주입된 서비스에서 작업하는게 좋음
        // DB의 데이터가 변환 될 때는 레포지토리에서 작업
        const found = await this.authRepository.findOneBy({user_id: userId});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${userId}`);
        }

        return found;
    }

    async login(createAuthDto: CreateAuthDto): Promise<object>{
        const { userId, password } = createAuthDto;
        const found = await this.authRepository.findOneBy({user_id: userId});

        if (found && found.password === password) {
            return found;
        } else {
            return { message : "Login failed!!" };
        }   
    }
}
