import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../../user/models/user.model";
import { SongModel } from "./song.model";
import { ArtistModel } from "../../artist/models/artist.model";

@Table
export class SongArtistModel extends Model {
  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @Column
  @ForeignKey(() => ArtistModel)
  artist_id: number
}
