import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

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
  // Auth모듈에서 쓸 수 있게함 
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy
  ],
  // JwtStrategy와 PassportModule을 다른 Module에서도 쓸 수 있게함
  exports: [
    JwtStrategy, 
    PassportModule
  ]
})
export class AuthModule {}
