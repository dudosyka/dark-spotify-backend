import {
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
import { UserOutput, UserOutputDto } from "../dtos/user.output.dto";
import { HttpBadRequestException } from "../exceptions/http.bad.request.exception";
import { CheckFriendInterceptor } from "../../../utils/check.friend.interceptor";

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private rbacService: RbacService,
    private userService: UserService,
    private streamService: StreamService
  ) {}

  @Get('/:login')
  @UseInterceptors(CheckFriendInterceptor)
  public async user(@Request() req, @Param('login') login: string): Promise<UserOutput> {
    const user = await this.userService.findOne({
      login
    });
    if (!user) {
      throw new HttpUserNotFoundException(login)
    }

    const output = new UserOutputDto([user]);
    if (user.closed && !req.isFriend)
      return output.closed()[0];
    else
      return output.open()[0];
  }

  @Get('/:login/playlists')
  @UseInterceptors(CheckFriendInterceptor)
  public async userPlaylists(@Request() req, @Param('login') login: string): Promise<PlaylistModel[]> {
    const user = await this.userService.findOne({
        login
      }, [ { model: PlaylistModel, include: [ SongModel ] } ])

    const output = new UserOutputDto([user]);
    if (user.closed && !req.isFriend)
      throw new HttpBadRequestException("Failed. Profile is closed!");
    else
      return output.open()[0].playlists;
  }

  @Get('/stream')
  public async getStream(@Req() req) {
    return await this.streamService.findByUser(req.user.user);
  }

  @Get('/:login/friends')
  @UseInterceptors(CheckFriendInterceptor)
  public async getFriends(@Req() req, @Param('login') login: string): Promise<UserOutput[] | void> | never {
      if (req.user.login != login && req.isFriend) {
        const friends = await this.userService.getFriends({ login: login }).catch(err => {
          throw new HttpBadRequestException(err.message);
        });
        const output = new UserOutputDto(friends);
        return output.closed();
      }
      else if (req.user.login == login) {
        const friends = req.user.friends;
        const output = new UserOutputDto(friends);
        return output.closed();
      }
      else {
        return [];
      }
  }

  @Get('/friends/requests')
  public async getFriendsRequests(@Req() req): Promise<UserOutput[]> | never {
      const requests = await this.userService.getFriendsRequests({ id: req.user.user });
      const output = new UserOutputDto(requests);

      return output.closed();
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
