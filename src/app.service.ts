import { Injectable } from '@nestjs/common';
import { UserService } from "./user/user.service";
import { UserModel } from "./user/models/user.model";

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  getHello(): Promise<UserModel[]> {
    return this.userService.getSongs()
  }
}
