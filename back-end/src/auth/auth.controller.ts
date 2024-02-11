import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './auth.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    createUser(@Body() createAuthDto: CreateAuthDto): Promise <void> {
        return this.authService.createUser(createAuthDto);
    }

    @Post('/login')
    login(@Body() body: any) {
        console.log('Received POST request with body:', body);
        
        return this.authService.login(body);
    }

    @Delete('/:userId')
    deleteUserById(@Param('userId') userId: string): Promise <void> {
        return this.authService.deleteUserById(userId);
    }
}
