import { Controller, Get, UseGuards, Param, Post, Request, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AlbumService } from "./album.service";
import { SongModel } from "../song/models/song.model";
import { AlbumTypeModel } from "./models/album.type.model";
import { AlbumModel } from "./models/album.model";
import { AlbumDto } from "./album.dto";

@Controller('album')
@UseGuards(AuthGuard('jwt'))
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get('/')
  async getAlbums(): Promise<typeof AlbumModel[]> {
    return await this.albumService.getAll({
      include: [AlbumTypeModel]
    })
  }

  @Get('/:id')
  async getAlbum(@Param('id') album_id: number): Promise<typeof AlbumModel>  {
    return await this.albumService.getOne({
      where: {
        id: album_id
      },
      include: [AlbumTypeModel]
    })
  }

  @Get(':id/songs')
  async getAlbumSongs(@Param('id') album_id: number): Promise<typeof AlbumModel> {
    return await this.albumService.getOne({
      where: {
        id: album_id
      },
      include: [SongModel, AlbumTypeModel]
    })
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
