import { ForeignKey, Table } from "sequelize-typescript";
import { PlaylistModel } from "./playlist.model";
import { GenreModel } from "../../genre/models/genre.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class PlaylistGenreModel extends BaseModel {
  @ForeignKey(() => PlaylistModel)
  playlist_id: number

  @ForeignKey(() => GenreModel)
  genre_id: number
}
