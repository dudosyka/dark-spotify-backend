import { BelongsToMany, Column, ForeignKey, Table } from "sequelize-typescript";
import { PlaylistVisibleTypeModel } from "./playlist.visible.type.model";
import { UserModel } from "../../user/models/user.model";
import { SongModel } from "../../song/models/song.model";
import { GenreModel } from "../../genre/models/genre.model";
import { PlaylistSongModel } from "./playlist.song.model";
import { PlaylistGenreModel } from "./playlist.genre.model";
import { PlaylistUserModel } from "./playlist.user.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class PlaylistModel extends BaseModel {
  @Column
  name: string;

  @Column
  image: string

  @ForeignKey(() => PlaylistVisibleTypeModel)
  playlist_visible_type: PlaylistVisibleTypeModel

  @BelongsToMany(() => SongModel, () => PlaylistSongModel)
  songs: SongModel[]

  @BelongsToMany(() => GenreModel, () => PlaylistGenreModel)
  genres: GenreModel[]

  @BelongsToMany(() => UserModel, () => PlaylistUserModel)
  users: UserModel[]
}
