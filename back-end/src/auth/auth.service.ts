import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auto.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createUser(createAuthDto: CreateAuthDto): Promise <void> {
        return this.authRepository.createUser(createAuthDto);
    }

    login(body): object{
        return this.authRepository.login(body);
    }
}
