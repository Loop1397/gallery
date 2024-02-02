import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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
  login(@Body() body: any) {
    console.log('Received POST request with body:', body);

    return this.appService.login(body);
  }
}