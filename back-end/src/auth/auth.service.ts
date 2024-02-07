import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    createUser(body): object {
        return this.authRepository.createUser(body);
    }

    login(body): object{
        return this.authRepository.login(body);
    }
}
