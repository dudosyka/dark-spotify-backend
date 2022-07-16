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

  @ForeignKey(() => SongModel)
  status: SongModel;

  @BelongsToMany(() => SongModel, () => UserSongModel)
  songs: SongModel[]

  @BelongsToMany(() => PlaylistModel, () => PlaylistUserModel)
  playlists: PlaylistModel[]

  @BelongsToMany(() => UserModel, { through: () => FriendModel, foreignKey: 'parent', as: 'friends' })
  friends: UserModel[]

  @BelongsToMany(() => RuleModel, () => UserRuleModel)
  rules: RuleModel[]
}
