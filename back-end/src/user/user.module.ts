import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    //passport 미들웨어를 사용하기 위한 passport 라이브러리 등록
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      // jwt 토큰 발행시에 들어가는 secret 문자열
      secret: 'Secret1234',
      signOptions: {
        //토큰이 유효한 시간 옵션(초 단위)
        expiresIn: 60 * 60,
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
