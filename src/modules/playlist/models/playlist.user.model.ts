import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { PlaylistModel } from "./playlist.model";
import { UserModel } from "../../user/models/user.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class PlaylistUserModel extends BaseModel {
  @ForeignKey(() => PlaylistModel)
  playlist_id: number

  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  owner: boolean

  @BelongsTo(() => PlaylistModel, 'playlist_id')
  playlist: PlaylistModel
}
