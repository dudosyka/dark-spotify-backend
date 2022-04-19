import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { ArtistModel } from "../../artist/models/artist.model";
import { SongArtistModel } from "./song.artist.model";
import { GenreModel } from "../../genre/models/genre.model";
import { SongGenreModel } from "./song.genre.model";
import { AlbumModel } from "../../album/models/album.model";
import { SongAlbumModel } from "./song.album.model";

@Table
export class SongModel extends Model {
  declare id: number

  @Column
  name: string;

  @Column
  path: string;

  @BelongsToMany(() => ArtistModel, () => SongArtistModel)
  artists: ArtistModel[]

  @BelongsToMany(() => GenreModel, () => SongGenreModel)
  genres: GenreModel[]

  @BelongsToMany(() => AlbumModel, () => SongAlbumModel)
  albums: AlbumModel[]

}
