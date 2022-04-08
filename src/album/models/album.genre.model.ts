import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { AlbumModel } from "./album.model";
import { GenreModel } from "../../genre/models/genre.model";

@Table
export class AlbumGenreModel extends Model {
  @Column
  @ForeignKey(() => AlbumModel)
  album_id: number


  @Column
  @ForeignKey(() => GenreModel)
  genre_id: number
}
