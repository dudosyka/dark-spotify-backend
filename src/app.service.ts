import { Injectable } from '@nestjs/common';
import { UserService } from "./modules/user/services/user.service";
import { SongModel } from "./modules/song/models/song.model";

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  getHello(): Promise<SongModel[]> {
    return this.userService.getSongs()
  }
}
