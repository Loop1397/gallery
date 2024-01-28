import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { todo } from 'node:test';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('HELLO!');
    return this.appService.getHello();
  }

  @Post()
  async function(@Body() body: any) {
    console.log('Received POST request with body:', body);
    // 여기에서 body를 가지고 필요한 작업을 수행
    return { message: 'POST request handled successfully' };
  }
}
