import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../../user/models/user.model";
import { SongModel } from "./song.model";
import { GenreModel } from "../../genre/models/genre.model";

@Table
export class SongGenreModel extends Model {
  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @Column
  @ForeignKey(() => GenreModel)
  genre_id: number
}
