import { BelongsToMany, Column, ForeignKey, Table } from "sequelize-typescript";
import { ArtistModel } from "../../artist/models/artist.model";
import { SongArtistModel } from "./song.artist.model";
import { GenreModel } from "../../genre/models/genre.model";
import { SongGenreModel } from "./song.genre.model";
import { AlbumModel } from "../../album/models/album.model";
import { SongAlbumModel } from "./song.album.model";
import { BaseModel } from "../../../utils/base.model";
import { UserSongModel } from "../../user/models/user.song.model";

@Table
export class SongModel extends BaseModel {
  @ForeignKey(() => UserSongModel)
  @ForeignKey(() => SongModel)
  declare id?: number

  @Column
  name?: string;

  @Column
  path?: string;

  @Column
  duration?: number

  @BelongsToMany(() => ArtistModel, () => SongArtistModel)
  artists?: ArtistModel[]

  @BelongsToMany(() => GenreModel, () => SongGenreModel)
  genres?: GenreModel[]

  @BelongsToMany(() => AlbumModel, () => SongAlbumModel)
  albums?: AlbumModel[]
}
