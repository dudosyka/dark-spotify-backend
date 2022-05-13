import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { GenreModel } from "../../genre/models/genre.model";
import { ArtistModel } from "./artist.model";

@Table
export class ArtistGenreModel extends Model {
  @Column
  @ForeignKey(() => GenreModel)
  genre_id: number

  @Column
  @ForeignKey(() => ArtistModel)
  artist_id: number
}
