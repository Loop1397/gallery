import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auto.dto';
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
}
