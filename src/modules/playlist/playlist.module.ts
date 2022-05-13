import { Module } from '@nestjs/common';
import { PlaylistService } from './services/playlist.service';

@Module({
  providers: [PlaylistService],
  exports: [PlaylistService]
})
export class PlaylistModule {}
