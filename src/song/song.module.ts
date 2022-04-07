import { Module } from '@nestjs/common';
import { SongService } from "./song.service";
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [ArtistModule, AlbumModule, GenreModule],
  controllers: [],
  providers: [SongService],
})
export class SongModule {}
