import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModel } from "./user/models/user.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<UserModel[]> {
    return this.appService.getHello()
  }

}
