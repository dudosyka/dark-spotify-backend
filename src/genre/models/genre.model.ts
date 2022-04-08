import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { SongGenreModel } from "../../song/models/song.genre.model";

@Table
export class GenreModel extends Model {
  @ForeignKey(() => SongGenreModel)
  id: number

  @Column
  name: string
}
