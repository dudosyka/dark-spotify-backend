import { ForeignKey, Model, Table } from "sequelize-typescript";
import { PlaylistModel } from "./playlist.model";
import { SongModel } from "../../song/models/song.model";

@Table
export class PlaylistSongModel extends Model {
  @ForeignKey(() => PlaylistModel)
  playlist_id: number

  @ForeignKey(() => SongModel)
  song_id: number
}
