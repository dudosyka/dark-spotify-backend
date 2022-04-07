import { Module } from '@nestjs/common';
import { SongService } from "./song.service";

@Module({
  imports: [],
  controllers: [],
  providers: [SongService],
})
export class SongModule {}
