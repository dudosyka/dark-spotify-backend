import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../../user/models/user.model";
import { SongModel } from "./song.model";
import { AlbumModel } from "../../album/models/album.model";

@Table
export class SongAlbumModel extends Model {
  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @Column
  @ForeignKey(() => AlbumModel)
  album_id: number
}
