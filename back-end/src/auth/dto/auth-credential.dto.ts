import { IsNotEmpty, IsString } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}