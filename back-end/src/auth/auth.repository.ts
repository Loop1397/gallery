import { DataSource, Repository } from "typeorm";
import { Auth } from "./auth.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository extends Repository<Auth> {
    constructor(dataSource: DataSource) {
        super(Auth, dataSource.createEntityManager());
    }

    async createUser(body) {
        const { userId, password } = body;

        const found = await this.findOneBy({userId: userId});
        
        if (!found) {
            const user = new Auth();
            user.userId = userId;
            user.password = password;
            await user.save();

            return { message : "user created!!" };
        } else {
            return { message : "Existing user id" };
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