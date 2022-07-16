import { ForeignKey, Table } from "sequelize-typescript";
import { PlaylistModel } from "./playlist.model";
import { SongModel } from "../../song/models/song.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class PlaylistSongModel extends BaseModel {
  @ForeignKey(() => PlaylistModel)
  playlist_id: number

  @ForeignKey(() => SongModel)
  song_id: number
}
