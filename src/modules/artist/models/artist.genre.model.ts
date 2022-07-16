import { Column, ForeignKey, Table } from "sequelize-typescript";
import { GenreModel } from "../../genre/models/genre.model";
import { ArtistModel } from "./artist.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class ArtistGenreModel extends BaseModel {
  @Column
  @ForeignKey(() => GenreModel)
  genre_id?: number

  @Column
  @ForeignKey(() => ArtistModel)
  artist_id?: number
}
