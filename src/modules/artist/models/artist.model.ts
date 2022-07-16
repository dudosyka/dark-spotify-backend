import { BelongsToMany, Column, ForeignKey, Table } from "sequelize-typescript";
import { SongArtistModel } from "../../song/models/song.artist.model";
import { GenreModel } from "../../genre/models/genre.model";
import { ArtistGenreModel } from "./artist.genre.model";
import { AlbumModel } from "../../album/models/album.model";
import { ArtistAlbumModel } from "./artist.album.model";
import { SubscribeModel } from "../../user/models/subscribe.model";
import { UserModel } from "../../user/models/user.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class ArtistModel extends BaseModel {
  @ForeignKey(() => SongArtistModel)
  declare id?: number

  @Column
  name?: string

  @Column
  image?: string

  @BelongsToMany(() => GenreModel, () => ArtistGenreModel)
  genres?: GenreModel[]

  @BelongsToMany(() => AlbumModel, () => ArtistAlbumModel)
  albums?: AlbumModel[]

  @BelongsToMany(() => UserModel, () => SubscribeModel)
  subs?: UserModel[]
}
