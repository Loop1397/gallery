import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    createUser(@Body() createAuthDto: CreateAuthDto): Promise <void> {
        return this.authService.createUser(createAuthDto);
    }

    @Post('/login')
    login(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.login(createAuthDto);
    }

    @Get(':/userId')
    getUserInfoById(@Param('userId') userId: string) {
        return this.authService.getUserInfoById(userId);
    }

    @Delete('/:userId')
    deleteUserById(@Param('userId') userId: string): Promise <void> {
        return this.authService.deleteUserById(userId);
    }
}
