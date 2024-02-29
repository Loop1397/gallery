import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.authService.createUser(authCredentialsDto);
    }

    @Post('/login')
    login(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.login(authCredentialsDto);
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
