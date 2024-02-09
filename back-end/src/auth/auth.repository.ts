import { DataSource, Repository } from "typeorm";
import { Auth } from "./auth.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auto.dto";
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
}