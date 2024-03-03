import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository
  ],
})
export class AuthModule {}
