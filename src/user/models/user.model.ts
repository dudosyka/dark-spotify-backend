import { BelongsTo, BelongsToMany, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { SongModel } from "../../song/models/song.model";
import { UserSongModel } from "./user.song.model";
import { PlaylistModel } from "../../playlist/models/playlist.model";
import { PlaylistUserModel } from "../../playlist/models/playlist.user.model";
import { FriendModel } from "./friend.model";
import { RuleModel } from "../../rbac/models/rule.model";
import { UserRuleModel } from "../../rbac/models/user.rule.model";

@Table
export class UserModel extends Model {
  @ForeignKey(() => UserSongModel)
  @ForeignKey(() => FriendModel)
  id: number

  @Column
  login: string;

  @Column
  password: string;

  @Column
  image: string;

  @Column
  listened_time: number;

  @ForeignKey(() => SongModel)
  status: SongModel;

  @BelongsToMany(() => SongModel, () => UserSongModel)
  songs: SongModel[]

  @BelongsToMany(() => PlaylistModel, () => PlaylistUserModel)
  playlists: PlaylistModel[]

  @BelongsToMany(() => UserModel, {through: () => FriendModel, foreignKey: 'child', as: 'children'})
  children: UserModel[]

  @BelongsToMany(() => UserModel, {through: () => FriendModel, foreignKey: 'child', as: 'parent'})
  parent: UserModel[]

  friends() {
    return this.children.concat(this.parent)
  }

  @BelongsToMany(() => RuleModel, () => UserRuleModel)
  rules: RuleModel[]
}
