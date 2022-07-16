import { Column, ForeignKey, Table } from "sequelize-typescript";
import { AlbumModel } from "./album.model";
import { GenreModel } from "../../genre/models/genre.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class AlbumGenreModel extends BaseModel {
  @Column
  @ForeignKey(() => AlbumModel)
  album_id?: number


  @Column
  @ForeignKey(() => GenreModel)
  genre_id?: number
}
