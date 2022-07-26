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
  async status(): Promise<SongModel> {
    return SongModel.findOne({
      where: {
        id: this.status_song
      }
    });
  }

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

  @Column
  status_song: number

  @BelongsToMany(() => SongModel, () => UserSongModel)
  songs: SongModel[]

  @BelongsToMany(() => PlaylistModel, () => PlaylistUserModel)
  playlists: PlaylistModel[]

  @BelongsToMany(() => UserModel, { through: () => FriendModel, foreignKey: 'parent', as: 'friends' })
  friends: UserModel[]

  static get(query: {}, friends: boolean = false, playlists: boolean = false, songs: boolean = false): Promise<UserModel> {
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
    if (playlists) {
      include.push({
        model: PlaylistModel,
      })
    }
    if (songs) {
      include.push({
        model: SongModel,
      })
    }
    return new Promise<UserModel>((resolve, reject) => {
      UserModel.findAll({
        where: query,
        include
      }).then(res => {
        resolve(res[0]);
      }).catch(err => {
        reject(err)
      })
    });
  }

  async getSongs(limit: number = null): Promise<SongModel[]> {
    return UserSongModel.findAll({
      where: {
        user_id: this.getDataValue('id'),
        like: 1
      },
      limit,
      include: [
        SongModel
      ]
    }).then(res => {
      return res.map(el => el.song);
    })
  }

  async getPlaylists(limit: number = null): Promise<PlaylistModel[]> {
    return PlaylistUserModel.findAll({
      where: {
        user_id: this.getDataValue('id')
      },
      limit,
      include: [
        PlaylistModel
      ]
    }).then(res => {
      return res.map(el => el.playlist)
    });
  }

  async getFriends(limit: number = null): Promise<UserModel[]> {
    return FriendModel.findAll({
      where: {
          parent: this.getDataValue('id'),
          accepted: 1
      },
      limit,
      include: [
        UserModel
      ]
    }).then(res => res.map(el => el.friend))
  }

  @BelongsToMany(() => RuleModel, () => UserRuleModel)
  rules: RuleModel[]
}
