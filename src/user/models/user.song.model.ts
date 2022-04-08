import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { SongModel } from "../../song/models/song.model";

@Table
export class UserSongModel extends Model {

  @Column
  listen_count: number

  @Column
  downloaded: boolean

  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  @ForeignKey(() => SongModel)
  song_id: number
}
