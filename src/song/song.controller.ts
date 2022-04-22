import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request, Body, Get, Param } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { SongService } from "./song.service";
import { SongDto } from "./song.dto";

@Controller('song')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(private songService: SongService) {}

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
