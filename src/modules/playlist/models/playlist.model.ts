import { BelongsToMany, Column, ForeignKey, Table } from "sequelize-typescript";
import { PlaylistVisibleTypeModel } from "./playlist.visible.type.model";
import { UserModel } from "../../user/models/user.model";
import { SongModel } from "../../song/models/song.model";
import { GenreModel } from "../../genre/models/genre.model";
import { PlaylistSongModel } from "./playlist.song.model";
import { PlaylistGenreModel } from "./playlist.genre.model";
import { PlaylistUserModel } from "./playlist.user.model";
import { BaseModel } from "../../../utils/base.model";
import { Op } from "sequelize";

@Table
export class PlaylistModel extends BaseModel {
  @Column
  name: string;

  @Column
  image: string

  @ForeignKey(() => PlaylistVisibleTypeModel)
  playlist_visible_type: PlaylistVisibleTypeModel

  @Column
  duration: number

  @BelongsToMany(() => SongModel, () => PlaylistSongModel)
  songs: SongModel[]

  @BelongsToMany(() => GenreModel, () => PlaylistGenreModel)
  genres: GenreModel[]

  @BelongsToMany(() => UserModel, () => PlaylistUserModel)
  users: UserModel[]

  public static async owner(playlistId: number): Promise<number> {
    const model = await PlaylistUserModel.findOne({
      where: {
        playlist_id: playlistId,
        owner: {
          [Op.ne]: null
        }
      }
    })
    if (model)
      return model.user_id;
    else
      return 0
  }

  public static async checkOwner(playlistId: number, userId: number) {
    return userId == (await PlaylistModel.owner(playlistId));
  }

  public checkSongExists(song_id: number): boolean {
    const songs = this.songs.map(el => {
      return el.id;
    })
    return songs.includes(song_id);
  }
}
