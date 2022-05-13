import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { AlbumModel } from "../../album/models/album.model";
import { ArtistModel } from "./artist.model";

@Table
export class ArtistAlbumModel extends Model {
  @Column
  @ForeignKey(() => ArtistModel)
  artist_id: number

  @Column
  @ForeignKey(() => AlbumModel)
  album_id: number
}
