import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request, Body } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { SongService } from "./song.service";

@Controller('song')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(private songService: SongService) {}


  @Post('upload')
  @UseInterceptors(FilesInterceptor('songs[]', 20))
  public async upload(@Request() req, @UploadedFiles() songs: Array<Express.Multer.File>, @Body('song') songsData: string) {
    return this.songService.upload(songs, JSON.parse(songsData))
  }
}
