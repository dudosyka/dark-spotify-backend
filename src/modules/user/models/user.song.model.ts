import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { SongModel } from "../../song/models/song.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class UserSongModel extends BaseModel {
  @Column
  listen_count: number

  @Column
  downloaded: boolean

  @Column
  liked: number

  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @BelongsTo(() => SongModel, 'song_id')
  song: SongModel
}
