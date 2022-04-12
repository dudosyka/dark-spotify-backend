import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { SongGenreModel } from "../../song/models/song.genre.model";

@Table
export class GenreModel extends Model {
  @ForeignKey(() => SongGenreModel)
  declare id: number

  @Column
  declare name: string
}
