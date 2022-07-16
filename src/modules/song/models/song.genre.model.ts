import { Column, ForeignKey, Table } from "sequelize-typescript";
import { SongModel } from "./song.model";
import { GenreModel } from "../../genre/models/genre.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class SongGenreModel extends BaseModel {
  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @Column
  @ForeignKey(() => GenreModel)
  genre_id: number
}
