import { ForeignKey, Model, Table } from "sequelize-typescript";
import { PlaylistModel } from "./playlist.model";
import { GenreModel } from "../../genre/models/genre.model";

@Table
export class PlaylistGenreModel extends Model {
  @ForeignKey(() => PlaylistModel)
  playlist_id: number

  @ForeignKey(() => GenreModel)
  genre_id: number
}
