import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    
    //비밀번호 암호화 함수
    async hashPassword(password: string) {
        // hash(암호화할 비밀번호, salt)
        return await bcrypt.hash(password, 10);
    }
}
