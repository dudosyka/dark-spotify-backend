import { Column, ForeignKey, Table } from "sequelize-typescript";
import { SongModel } from "./song.model";
import { ArtistModel } from "../../artist/models/artist.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class SongArtistModel extends BaseModel {
  @Column
  @ForeignKey(() => SongModel)
  song_id: number

  @Column
  @ForeignKey(() => ArtistModel)
  artist_id: number
}
