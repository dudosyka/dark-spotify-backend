import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { PlaylistModel } from "./playlist.model";
import { UserModel } from "../../user/models/user.model";

@Table
export class PlaylistUserModel extends Model {
  @ForeignKey(() => PlaylistModel)
  playlist_id: number

  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  owner: boolean
}
