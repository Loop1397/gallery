import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async deleteUserById(userNumber: number): Promise <void> {
        return this.userRepository.deleteUserById(userNumber);
    }

    async getUserInfoById(userNumber: number) {
        // findOneBy를 사용해서 데이터를 갖고오기만 할거라면 레포지토리가 주입된 서비스에서 작업하는게 좋음
        // DB의 데이터가 변환 될 때는 레포지토리에서 작업
        const found = await this.userRepository.findOneBy({user_number: userNumber});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${userNumber}`);
        }

        return found;
    }

    /**
     * TODO
     * [x] : bcrypt를 이용하여 로그인 시 암호화된 비밀번호와 같은지 확인하도록 수정
     */
    async login(authCredentialsDto: AuthCredentialsDto): Promise<object>{
        const { userId, password } = authCredentialsDto;
        const found = await this.userRepository.findOneBy({user_id: userId});

        // bcrypt.compare() : 
        if (found && (await bcrypt.compare(password, found.password))) {
            return found;
        } else {
            return { message : "Login failed!!" };
        }   
    }
}
