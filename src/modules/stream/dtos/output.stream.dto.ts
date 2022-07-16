import { SongModel } from "../../song/models/song.model";
import { AlbumModel } from "../../album/models/album.model";

export interface OutputStreamOnPlay {
  song: SongModel,
  playlistPosition: number
}

export interface OutputStreamDto {
  onPlay: OutputStreamOnPlay,
  playList: typeof SongModel[],
  album: AlbumModel | null
}
