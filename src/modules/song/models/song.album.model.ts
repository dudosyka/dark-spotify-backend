import { Column, ForeignKey, Table } from "sequelize-typescript";
import { SongModel } from "./song.model";
import { AlbumModel } from "../../album/models/album.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class SongAlbumModel extends BaseModel {
  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @Column
  @ForeignKey(() => AlbumModel)
  album_id: number
}
