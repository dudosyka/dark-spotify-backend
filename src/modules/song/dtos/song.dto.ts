import { ArtistDto } from "../../artist/dtos/artist.dto";
import { GenreDto } from "../../genre/dtos/genre.dto";
import { AlbumDto } from "../../album/dtos/album.dto";

export interface SongDto {
  id: number,
  name: string,
  path: string,
  artists: ArtistDto[] | null,
  genres: GenreDto[] | null,
  albums: AlbumDto[] | null,
}
