import { BaseService } from "../../../utils/base.service";
import { FriendModel } from "../models/friend.model";
import { UserFriendDto } from "../dtos/user.friend.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserFriendCreateDto } from "../dtos/user.friend.create.dto";
import { MysqlExceptionService } from "../../../utils/mysql.exception.service";

export class FriendsService extends BaseService<UserFriendDto, typeof FriendModel> {
  constructor(
    @InjectModel(FriendModel) private friendModel: typeof FriendModel,
    private errService: MysqlExceptionService
  ) {
    super('', '', FriendModel, null);
  }

  public async createRequest(data: UserFriendCreateDto): Promise<void | FriendModel> {
    return await this.friendModel.create({
      parent: data.parent, child: data.child, accepted: 0
    }).catch(err => this.errService.throw(err))
  }

  public async removeRequest(data: UserFriendDto): Promise<number | void> {
    return await this.friendModel.destroy({
      where: {
        parent: data.parent,
        child: data.child
      }
    }).catch(err => this.errService.throw(err))
  }

  public async acceptRequest(data: UserFriendDto): Promise<boolean | void> {
    console.log(data)
    return await this.update({
      where: {
        child: data.child,
        parent: data.parent
      }
    }, [data])
      .catch(err => this.errService.throw(err))
  }
}
