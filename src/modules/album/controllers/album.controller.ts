import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AlbumService } from "../services/album.service";
import { AlbumTypeModel } from "../models/album.type.model";
import { AlbumModel } from "../models/album.model";
import { AlbumDto } from "../dtos/album.dto";
import { StreamService } from "../../stream/services/stream.service";
import { StreamInsertPosition, StreamInsertType } from "../../stream/dtos/update.stream.dto";

@Controller('album')
@UseGuards(AuthGuard('jwt'))
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private streamService: StreamService) {
  }

  @Get('/')
  async getAlbums(): Promise<AlbumModel[]> {
    return await this.albumService.getAll({
      include: [AlbumTypeModel]
    })
  }

  @Get('/:id')
  async getAlbum(@Param('id') album_id: number): Promise<AlbumModel>  {
    return await this.albumService.getOne({
      where: {
        id: album_id
      },
      include: [AlbumTypeModel]
    })
  }

  @Post('/:id/play')
  async playAlbum(@Req() req, @Param('id') album_id: number): Promise<string> {
    return await this.streamService.play(req.user.user, {
      insertPosition: StreamInsertPosition.newQueue,
      insertType: StreamInsertType.Album,
      value: [album_id]
    });
  }

  @Get(':id/songs')
  async getAlbumSongs(@Param('id') album_id: number): Promise<AlbumModel> {
    return await this.albumService.getSongs(album_id);
  }

  @Post('/create')
  async createAlbum(@Request() req, @Body('data') data: AlbumDto[]) {
    return await this.albumService.createNew(data)
  }

  @Post(':id/update')
  async update(@Param('id') album_id: number, @Body('onUpdate') onUpdate: AlbumDto[]): Promise<boolean> {
    return await this.albumService.update({
      where: {
        id: album_id
      }
    }, onUpdate)
  }

  @Post(':id/delete')
  async delete(@Param('id') album_id: number): Promise<number> {
    return await this.albumService.delete({
      where: {
        id: album_id
      }
    })
  }
}
