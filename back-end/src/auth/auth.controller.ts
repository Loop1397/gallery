import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    createUser(@Body() body: any) {
        return this.authService.createUser(body);
    }

    @Post('/login')
    login(@Body() body: any) {
        console.log('Received POST request with body:', body);
        
        return this.authService.login(body);
    }
}
