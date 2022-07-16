import { Column, ForeignKey, Table } from "sequelize-typescript";
import { AlbumModel } from "../../album/models/album.model";
import { ArtistModel } from "./artist.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class ArtistAlbumModel extends BaseModel {
  @Column
  @ForeignKey(() => ArtistModel)
  artist_id?: number

  @Column
  @ForeignKey(() => AlbumModel)
  album_id?: number
}
