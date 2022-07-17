import { BaseService } from "../../../utils/base.service";
import { FriendModel } from "../models/friend.model";
import { UserFriendDto } from "../dtos/user.friend.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserFriendCreateDto } from "../dtos/user.friend.create.dto";
import { MysqlExceptionService } from "../../../utils/mysql.exception.service";
import { Op } from "sequelize";

export class FriendsService extends BaseService<UserFriendDto> {
  constructor(
    @InjectModel(FriendModel) private friendModel: typeof FriendModel,
    private errService: MysqlExceptionService
  ) {
    super("", "", friendModel, null );
  }

  public async createRequest(data: UserFriendCreateDto): Promise<void | FriendModel> {
    //Double the request because of specific logic in FriendsModel (we go to create parent-to-child request both for two friends)
    await this.friendModel.create({
      parent: data.child, child: data.parent, accepted: 0, initiator: data.initiator
    }).catch(err => this.errService.throw(err))
    return await this.friendModel.create({
      parent: data.parent, child: data.child, accepted: 0, initiator: data.initiator
    }).catch(err => this.errService.throw(err))
  }

  public async removeRequest(user_id: number, friend_id: number): Promise<number | void> {
    //We are going to remove both of request which was created at createRequest() method
    return await FriendModel.destroy({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { child: user_id },
              { parent: friend_id }
            ]
          },
          {
            [Op.and]: [
              { child: friend_id },
              { parent: user_id }
            ]
          }
        ]
      }
    }).catch(err => this.errService.throw(err))
  }

  public async acceptRequest(user_id: number, friend_id: number): Promise<boolean | void> {
    //We are going to accept both of request which was created at createRequest() method
    const query = {
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { child: user_id },
              { parent: friend_id },
              { initiator: friend_id }
            ]
          },
          {
            [Op.and]: [
              { child: friend_id },
              { parent: user_id },
              { initiator: friend_id }
            ]
          }
        ]
      }
    }
    const data = await this.friendModel.findAll(query);
    const onUpdate = data.map(el => {
      return {
        id: el.id,
        accepted: 1
      };
    })
    if (data.length)
      return await this.update(query, onUpdate);
    else
      throw Error('Request not found!');
  }
}
