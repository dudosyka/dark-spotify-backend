import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { RbacService } from "../../rbac/services/rbac.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../services/user.service";
import { PlaylistModel } from "../../playlist/models/playlist.model";
import { SongModel } from "../../song/models/song.model";
import { UserModel } from "../models/user.model";
import { HttpUserNotFoundException } from "../exceptions/http.user.not.found.exception";
import { FileInterceptor } from "@nestjs/platform-express";
import { StreamService } from "../../stream/services/stream.service";

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private rbacService: RbacService,
    private userService: UserService,
    private streamService: StreamService
  ) {}

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

  @Get('/stream')
  public async getStream(@Req() req) {
    return await this.streamService.findByUser(req.user.user);
  }

  @Get('/friends')
  public async getFriends(@Req() req, @Param('userId') userId: number): Promise<UserModel[] | void> | never {
      return await this.userService.getFriends(req.user.user);
  }

  @Get(':userId/friends')
  public async getFriendsByUser(@Req() req, @Param('userId') userId: number): Promise<UserModel[] | void> | never {
      return await this.userService.getFriends(userId);
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(@Request() req, @UploadedFile() avatar: Express.Multer.File): Promise<{ path: string }> {
    return {
      path: await this.userService.uploadAvatar(req.user.user, avatar)
    }
  }
}
