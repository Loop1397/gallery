import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
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
    async login(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const { userId, password } = authCredentialsDto;
        const found = await this.userRepository.findOneBy({user_id: userId});

        // bcrypt.compare() : 
        if (found && (await bcrypt.compare(password, found.password))) {
            // 로그인 성공 시 유저 토큰을 생성해야함 ( jwt, Secret + Payload )
            // 토큰을 이용해 정보를 가져갈 위험성이 있기 때문에 payload에는 중요한 정보를 넣으면 안 됨
            const payload = { userId };
            // sign : payload를 토대로 토큰을 생성해주는 메소드
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException("Login failed!!")
        }   
    }

    // https://kscodebase.tistory.com/598
    async recovery(userNumber:number) {
        // const softDeletedUser = await this.userRepository.findOne(id, {
        //     withDeleted: true,
        // });

        const [softDeletedUser] = await this.userRepository.find({
            take:1,
            where: {
                user_number: userNumber,
            },
            withDeleted: true
        });
  
        if (softDeletedUser) {
            // deletedAt 속성을 null로 설정하여 복원합니다.
            softDeletedUser.deleted_at = null;
            // 변경된 속성을 저장합니다.
            await this.userRepository.save(softDeletedUser);
        }
    }
}
