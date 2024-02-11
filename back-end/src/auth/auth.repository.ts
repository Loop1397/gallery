import { DataSource, Repository } from "typeorm";
import { Auth } from "./auth.entity"
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { create } from "domain";

@Injectable()
export class AuthRepository extends Repository<Auth> {
    constructor(dataSource: DataSource) {
        super(Auth, dataSource.createEntityManager());
    }

    async createUser(createAuthDto: CreateAuthDto): Promise <void> {
        const { userId, password } = createAuthDto;

        const user = new Auth();
        user.userId = userId;
        user.password = password;
        
        if(!await this.findOneBy({userId: userId})) {
            await user.save();
        } else {
            throw new ConflictException('Existing userId');
        }
    }

    async login(body) {
        const { userId, password } = body;

        const found = await this.findOneBy({userId: userId})
    
        if (found && found.password === password) {
          return found;
        } else {
          return { message : "Login failed!!" };
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