import { ArtistDto } from "../artist/artist.dto";
import { GenreDto } from "../genre/genre.dto";
import { AlbumDto } from "../album/album.dto";

export interface SongDto {
  id: number,
  name: string,
  path: string,
  artists: ArtistDto[] | null,
  genres: GenreDto[] | null,
  albums: AlbumDto[] | null,
}
