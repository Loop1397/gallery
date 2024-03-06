import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    /** 
     * TODO
     * [ ] : soft delete에도 대응 가능한지 확인 or 수정
     */
    async validate(payload) {
        const { userId } = payload;
        const found: User = await this.userRepository.findOneBy({user_id: userId});

        if(!found) {
            throw new UnauthorizedException();
        }

        return found;
    }
}