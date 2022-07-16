import { BelongsToMany, Column, ForeignKey, HasOne, Table } from "sequelize-typescript";
import { AlbumTypeModel } from "./album.type.model";
import { SongModel } from "../../song/models/song.model";
import { SongAlbumModel } from "../../song/models/song.album.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class AlbumModel extends BaseModel {
  @Column
  name?: string

  @HasOne(() => AlbumTypeModel, 'album_type_id')
  @ForeignKey(() => AlbumTypeModel)
  type?: AlbumTypeModel

  @BelongsToMany(() => SongModel, () => SongAlbumModel)
  songs?: SongModel[]
}
