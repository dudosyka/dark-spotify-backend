import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  Body,
  Get,
  Param,
  Req
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { SongService } from "./song.service";
import { SongDto } from "./song.dto";
import { StreamService } from "../stream/stream.service";

@Controller('song')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(
    private songService: SongService,
    private streamService: StreamService,) {}

  @Get('/')
  async getSongs() {
    return this.songService.getAll();
  }

  @Get(':id')
  async getSong(@Param('id') song_id) {
    return this.songService.getOne({
      where: {
        id: song_id
      }
    })
  }

  @Get(':id/play')
  async playSong(@Req() req, @Param('id') song_id: number): Promise<number> {
    const stream = await this.streamService.create({
      userId: req.user.user,
      onPlay: {
        songId: song_id,
        playlistPosition: 0
      },
      playList: [song_id],
      album: null
    });
    await stream.save();
    return stream._id
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('songs[]', 20))
  public async upload(@Request() req, @UploadedFiles() songs: Array<Express.Multer.File>, @Body('song') songsData: string) {
    return this.songService.upload(songs, JSON.parse(songsData))
  }

  @Post(':id/delete')
  async delete(@Param('id') song_id: number): Promise<number> {
    return await this.songService.delete({
      where: {
        id: song_id
      }
    })
  }

  @Post(':id/update')
  async update(@Param('id') song_id: number, @Body('onUpdate') onUpdate: SongDto[]): Promise<boolean> {
    return await this.songService.update({
      where: {
        id: song_id
      }
    }, onUpdate)
  }

  // @Post(':id/move')
  // async move(@Param('id') song_id: number) {
  //
  // }
}
