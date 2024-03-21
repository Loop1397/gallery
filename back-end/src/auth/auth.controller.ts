import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    /**
     * TODO
     * [ ] : 논리 삭제된 계정을 복구할 수 있도록 변경
     */

    @Post('/signup')
    createUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.authService.createUser(authCredentialsDto);
    }

    // UseGuards는 passport에서 제공하는 middleware중 하나
    // AuthGuard를 사용하면 jwt.strategy.ts의 validate에서 리턴하는 유저 값을 가져올수가 있음
    // 인증에대한 미들웨어 처리
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user);
    }

    @Post('/login')
    login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.login(authCredentialsDto);
    }

    // soft-delete된 계정 복구용 메소드 
    @Post('/recovery/:userNumber')
    recovery(@Param('userNumber') userNumber: number) {
        return this.authService.recovery(userNumber);
    }

    @Get('/:userNumber')
    getUserInfoById(@Param('userNumber') userNumber: number) {
        return this.authService.getUserInfoById(userNumber);
    }

    @Delete('/:userNumber')
    deleteUserById(@Param('userNumber') userNumber: number): Promise <void> {
        return this.authService.deleteUserById(userNumber);
    }
}
