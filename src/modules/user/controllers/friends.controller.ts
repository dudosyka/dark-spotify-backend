import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FriendsService } from '../services/friends.service'
import { FriendModel } from "../models/friend.model";

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
  constructor(
    private friendsService: FriendsService
  ) {}

  @Get("/")
  public test() {
    return this.friendsService.test();
  }

  @Post(':id/add')
  public async createFriendRequest(@Req() req, @Param('id') user_id: number): Promise<void | FriendModel> | never {
    return this.friendsService.createRequest({
      child: user_id,
      parent: req.user.user
    })
  }

  @Post(':id/remove')
  public async removeRequest(@Req() req, @Param('id') friend_id: number): Promise<number | void> | never {
    return this.friendsService.removeRequest(req.user.user, friend_id)
  }

  @Post(':id/accept')
  public async acceptRequest(@Req() req, @Param('id') friend_id: number): Promise<boolean | void> | never {
    return this.friendsService.acceptRequest(req.user.user, friend_id)
  }
}
