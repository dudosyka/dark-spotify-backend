import {
  Body,
  Controller,
  Get, HttpCode,
  Param,
  Post,
  Req,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { SongService } from "../services/song.service";
import { SongDto } from "../dtos/song.dto";
import { StreamService } from "../../stream/services/stream.service";
import { StreamInsertPosition, StreamInsertType } from "../../stream/dtos/update.stream.dto";
import { UserService } from "../../user/services/user.service";

@Controller('song')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(
    private songService: SongService,
    private streamService: StreamService,
    private userService: UserService
  ) {}

  @Get('/')
  async getSongs() {
    return this.songService.getAll();
  }

  @Get(':id')
  async getSong(@Param('id') song_id: number) {
    return this.songService.getOne({
      where: {
        id: song_id
      }
    })
  }

  @Get(':id/play')
  async playSong(@Req() req, @Param('id') song_id: number): Promise<string> {
    return this.streamService.play(req.user.user, {
      insertType: StreamInsertType.Song,
      insertPosition: StreamInsertPosition.newQueue,
      value: [ song_id ]
    });
  }

  @Post(':id/like')
  async likeSong(@Req() req, @Param('id') song_id: string): Promise<void | boolean> {
    return this.userService.likeSong({
      listen_count: 0,
      downloaded: 0,
      user_id: req.user.user,
      song_id: parseInt(song_id),
      like: 1,
    }).then(() => true);
  }

  @Post(':id/unlike')
  @HttpCode(200)
  async unlikeSong(@Req() req, @Param('id') song_id: string): Promise<boolean> {
    return this.userService.unlikeSong(req.user.user, parseInt(song_id));
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
}
