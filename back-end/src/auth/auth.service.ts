import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private user = {
      "userId" : "hello",
      "password" : "12345"
    };

    createUser(body): object {
        const { userId, password } = body;

        if (this.user.userId !== userId) {
            return { message : "User created!!" };
        } else {
            return { message : "Existing username"};
        }
        
    }

    login(body): object{
        const { userId, password } = body;
    
        if (this.user.userId === userId && this.user.password === password) {
          return { message : "Login success!!" };
        } else {
          return { message : "Login failed!!" };
        }   
    }
}
