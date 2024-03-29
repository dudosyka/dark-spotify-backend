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
import { HttpUserNotFoundException } from "../exceptions/http.user.not.found.exception";
import { FileInterceptor } from "@nestjs/platform-express";
import { StreamService } from "../../stream/services/stream.service";
import { FriendRequestOutput, UserOutput, UserOutputDto } from '../dtos/user.output.dto';
import { HttpBadRequestException } from "../../../exceptions/http.bad.request.exception";
import { CheckFriendInterceptor } from "../../../utils/check.friend.interceptor";
import { HttpForbiddenException } from "../../../exceptions/http.forbidden.exception";

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private rbacService: RbacService,
    private userService: UserService,
    private streamService: StreamService
  ) {}

  @Get('/stream')
  public async getStream(@Req() req) {
    return await this.streamService.findByUser(req.user.user).then(r => {
      return {
        id: r._id,
        ...r['_doc']
      }
    });
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(@Request() req, @UploadedFile() avatar: Express.Multer.File): Promise<{ path: string }> {
    return {
      path: await this.userService.uploadAvatar(req.user.user, avatar)
    }
  }

  @Get('/friends/requests')
  public async getFriendsRequests(@Req() req): Promise<FriendRequestOutput[]> | never {
    const requests = await this.userService.getFriendsRequests({ id: req.user.user });

    return requests.map(el => {
      const userOutput = new UserOutputDto([el.user]);
      return {
        user: userOutput.closed()[0],
        initiator: el.initiator
      }
    });
  }

  @Get('/:login')
  @UseInterceptors(CheckFriendInterceptor)
  public async user(@Request() req, @Param('login') login: string): Promise<UserOutput> {
    const userModel = await this.userService.get({ login: login }).catch(err => {
      throw new HttpBadRequestException(err.message);
    });

    if (!userModel) {
      throw new HttpUserNotFoundException(login)
    }

    if (userModel.closed && !req.isFriend) {
      const output = new UserOutputDto([userModel]);
      return output.closed()[0];
    }
    else {
      userModel.friends = await userModel.getFriends(5);
      userModel.songs = await userModel.getSongs(5);
      userModel.playlists = await userModel.getPlaylists(5);
      const output = new UserOutputDto([userModel]);
      return (await output.open())[0];
    }
  }

  @Get('/:login/playlists')
  @UseInterceptors(CheckFriendInterceptor)
  public async userPlaylists(@Request() req, @Param('login') login: string): Promise<PlaylistModel[]> {
    const user = await this.userService.findOne({
        login
      }, [ { model: PlaylistModel, include: [ SongModel ] } ])

    const output = new UserOutputDto([user]);
    if (user.closed && !req.isFriend)
      throw new HttpForbiddenException("Profile is closed.");
    else
      return (await output.open())[0].playlists;
  }

  @Get('/:login/friends')
  @UseInterceptors(CheckFriendInterceptor)
  public async getFriends(@Req() req, @Param('login') login: string): Promise<UserOutput[] | void> | never {
      if (req.user.login != login && req.isFriend) {
        const user = await this.userService.get({ login: login });
        const friends = await this.userService.getFriends({ id: user.id }).catch(err => {
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

  @Get('/:login/songs')
  @UseInterceptors(CheckFriendInterceptor)
  public async getSongs(@Req() req, @Param('login') login: string): Promise<SongModel[]> {
    if (req.isFriend) {
      const userModel = await this.userService.get({ login: login }).catch(err => {
        throw new HttpBadRequestException(err.message);
      });
      return await userModel.getSongs();
    }
    else {
      throw new HttpForbiddenException("Profile is closed.");
    }
  }
}
