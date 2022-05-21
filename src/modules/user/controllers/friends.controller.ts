import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FriendsService } from '../services/friends.service'
import { FriendModel } from "../models/friend.model";

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
  constructor(
    private friendsService: FriendsService
  ) {}

  @Post(':id/add')
  public async createFriendRequest(@Req() req, @Param('id') user_id: number): Promise<void | FriendModel> | never {
    return this.friendsService.createRequest({
      child: user_id,
      parent: req.user.user
    })
  }

  @Post(':id/remove')
  public async removeRequest(@Req() req, @Param('id') user_id: number): Promise<number | void> | never {
    return this.friendsService.removeRequest({
      child: 6,
      parent: user_id,
      accepted: 0
    })
  }

  @Post(':id/accept')
  public async acceptRequest(@Req() req, @Param('id') user_id: number): Promise<boolean | void> | never {
    return this.friendsService.acceptRequest({
      child: 6,
      parent: user_id,
      accepted: 1
    })
  }
}
