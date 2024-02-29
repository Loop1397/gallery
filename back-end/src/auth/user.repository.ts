import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity"
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { create } from "domain";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        const { userId, password } = authCredentialsDto;

        //bcrypt를 이용하여 password 암호화
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // const user = new User();
        // user.user_id = userId;
        // user.password = hashedPassword;

        //typeORM에서 제공하는 메소드
        //동작은 위의 코드와 동일
        const user = this.create({user_id: userId, password: hashedPassword});
        
        try {
            await this.save(user);
        } catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing userId');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }

    /** 
     * TODO
     * [ ] : softDelete를 사용하기 위해 entity 수정하기(deleted 속성 추가)
     * [ ] : soft delete와 hard delete 차이에 관한 포스팅하기
     */
    async deleteUserById(userNumber: number): Promise <void> {
        // const result = await this
        // .createQueryBuilder()
        // .delete()
        // .where("user_number = :userNumber", {user_number: userNumber})
        // .execute()

        //typeORM에서 제공하는 메소드
        const result = await this.delete(userNumber);

        // 존재하지 않는 id를 지우지 않으려고 할 때
        // 영향을 받은(지워진 데이터) 데이터 수가 result.affected로 출력됨(정수형)
        if(!result.affected) {
            throw new NotFoundException('존재하지 않는 id');
        }
    }

}