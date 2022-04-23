import { SongModel } from "../song/models/song.model";
import { AlbumModel } from "../album/models/album.model";

export interface OutputStreamDto {
  onPlay: typeof SongModel,
  playList: typeof SongModel[],
  album: typeof AlbumModel | null
}
