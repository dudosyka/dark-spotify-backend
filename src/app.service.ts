import { Injectable } from '@nestjs/common';
import { UserService } from "./user/user.service";
import { SongModel } from "./song/models/song.model";

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  getHello(): Promise<SongModel[]> {
    return this.userService.getSongs()
  }
}
