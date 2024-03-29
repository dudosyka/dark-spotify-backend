import { BelongsToMany, Column, ForeignKey, Table } from "sequelize-typescript";
import { SongGenreModel } from "../../song/models/song.genre.model";
import { AlbumModel } from "../../album/models/album.model";
import { AlbumGenreModel } from "../../album/models/album.genre.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class GenreModel extends BaseModel {
  @ForeignKey(() => SongGenreModel)
  declare id?: number

  @Column
  declare name?: string

  @BelongsToMany(() => AlbumModel, () => AlbumGenreModel)
  albums?: AlbumModel[]
}
