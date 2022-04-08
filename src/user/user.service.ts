import { Injectable } from "@nestjs/common";
import { SongModel } from "../song/models/song.model";
import { UserModel } from "./models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { FriendModel } from "./models/friend.model";

@Injectable()
export class UserService {
  constructor(@InjectModel (UserModel) private userModel: typeof UserModel) {}

  public async getSongs(): Promise<UserModel[]> {
    const user = await this.userModel.findOne({
      where: {
        id: 3
      },
      include: [SongModel, { model: UserModel, as: 'children' }, { model: UserModel, as: "parent" }]
    });

    return user.friends()
  }
}
