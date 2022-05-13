import { BelongsToMany, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { AlbumTypeModel } from "./album.type.model";
import { SongModel } from "../../song/models/song.model";
import { SongAlbumModel } from "../../song/models/song.album.model";

@Table
export class AlbumModel extends Model {
  @Column
  name: string

  @HasOne(() => AlbumTypeModel, 'album_type_id')
  @ForeignKey(() => AlbumTypeModel)
  type: AlbumTypeModel

  @BelongsToMany(() => SongModel, () => SongAlbumModel)
  songs: SongModel[]
}
