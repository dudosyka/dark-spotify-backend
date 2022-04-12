import { Body, Controller, Get, Request, UseGuards } from "@nestjs/common";
import { RbacService } from "../rbac/rbac.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { PlaylistModel } from "../playlist/models/playlist.model";
import { SongModel } from "../song/models/song.model";
import { UserModel } from "./models/user.model";
import { HttpUserNotFoundException } from "./http.user.not.found.exception";

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private rbacService: RbacService, private userService: UserService) {}

  private static getUserFromBody(@Request() req, userId: any): number {
    if (typeof userId === 'undefined') {
      return req.user.user;
    }
    return userId;
  }

  @Get('/')
  public async index(@Request() req, @Body('userId') userId): Promise<UserModel> {
    const id = UserController.getUserFromBody(req, userId);
    const user = await this.userService.findOne({
      id
    });
    if (!user) {
      throw new HttpUserNotFoundException(id)
    }
    user.password = ''
    return user;
  }

  @Get('/playlists')
  public async userPlaylists(@Request() req, @Body('userId') userId): Promise<PlaylistModel[]> {
    const id = UserController.getUserFromBody(req, userId);
    const user = await this.userService.findOne({
      id
    }, [ { model: PlaylistModel, include: [ SongModel ] } ])
    return user.playlists;
  }
}
