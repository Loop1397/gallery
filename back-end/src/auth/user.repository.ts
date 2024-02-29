import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity"
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { create } from "domain";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(createAuthDto: CreateAuthDto): Promise <void> {
        const { userId, password } = createAuthDto;

        const user = new User();
        user.user_id = userId;
        user.password = password;
        
        if(!await this.findOneBy({user_id: userId})) {
            await user.save();
        } else {
            throw new ConflictException('Existing userId');
        }
    }

    async deleteUserById(userId: string): Promise <void> {
        const result = await this
        .createQueryBuilder()
        .delete()
        .where("userId = :userId", {userId: userId})
        .execute()

        // 존재하지 않는 id를 지우지 않으려고 할 때
        if(!result.affected) {
            throw new NotFoundException('존재하지 않는 id');
        }
    }

}