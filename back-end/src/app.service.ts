import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(body): object{
    const user = {
      "userId" : "hello",
      "password" : "12345"
    };

    if (user.userId === body.userId && user.password === body.password) {
      return { message : "Login success!!" };
    } else {
      return { message : "Login failed!!" };
    }   
  }
}
