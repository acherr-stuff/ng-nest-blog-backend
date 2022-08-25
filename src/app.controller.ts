import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("hello")
    return this.appService.getHello();
  }

  @Get('/out')
  getOut(): string {
    console.log("goodbye")
    return this.appService.getOut();
  }
}
