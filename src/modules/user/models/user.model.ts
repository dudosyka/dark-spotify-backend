import { BelongsToMany, Column, ForeignKey, Table } from "sequelize-typescript";
import { SongModel } from "../../song/models/song.model";
import { UserSongModel } from "./user.song.model";
import { PlaylistModel } from "../../playlist/models/playlist.model";
import { PlaylistUserModel } from "../../playlist/models/playlist.user.model";
import { FriendModel } from "./friend.model";
import { RuleModel } from "../../rbac/models/rule.model";
import { UserRuleModel } from "../../rbac/models/user.rule.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class UserModel extends BaseModel {
  @ForeignKey(() => UserSongModel)
  @ForeignKey(() => FriendModel)
  declare id: number

  @Column
  login: string;

  @Column
  password: string;

  @Column
  image: string;

  @Column
  listened_time: number;

  @Column
  refresh: string;

  @Column
  closed: boolean;

  @ForeignKey(() => SongModel)
  status: SongModel;

  @BelongsToMany(() => SongModel, () => UserSongModel)
  songs: SongModel[]

  @BelongsToMany(() => PlaylistModel, () => PlaylistUserModel)
  playlists: PlaylistModel[]

  @BelongsToMany(() => UserModel, { through: () => FriendModel, foreignKey: 'parent', as: 'friends' })
  friends: UserModel[]

  static get(query: {}, friends: boolean = false): Promise<UserModel> {
    let include = [];
    if (friends) {
      include.push({
        model: UserModel,
        as: "friends",
        where: {
          "$friends->FriendModel.accepted$": 1
        }
      });
    }
    return new Promise<UserModel>(async (resolve) => {
      resolve(await UserModel.findOne({
        where: query,
        include
      }));
    });
  }

  static getFriends(userId: number): Promise<UserModel[]> {
    return new Promise<UserModel[]>(async (resolve) => {
      const model = await UserModel.findOne({
        where: {
          id: userId
        },
        include: [{
          model: UserModel,
          as: "friends",
          where: {
            "$friends->FriendModel.accepted$": 1
          }
        }]
      });
      if (model.friends)
        resolve(model.friends);
      else
        resolve([]);
    });
  }

  @BelongsToMany(() => RuleModel, () => UserRuleModel)
  rules: RuleModel[]
}
