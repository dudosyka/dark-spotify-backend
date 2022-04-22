import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { AlbumModel } from "../album/models/album.model";
import { SongModel } from "../song/models/song.model";
import { ArtistModel } from "./models/artist.model";
import { ArtistDto } from "./artist.dto";

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('')
  async getArtists(): Promise<typeof ArtistModel[]> {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async getArtist(@Param('id') artist_id: number): Promise<typeof ArtistModel> {
    return await this.artistService.getOne({
      where: {
        id: artist_id
      }
    })
  }

  @Get(':id/albums')
  async getArtistAlbums(@Param('id') artist_id: number): Promise<typeof ArtistModel> {
    return await this.artistService.getOne({
      where: {
        id: artist_id
      },
      include: [AlbumModel]
    })
  }

  @Get(':id/songs')
  async getArtistSongs(@Param('id') artist_id: number): Promise<typeof ArtistModel> {
    return await this.artistService.getOne({
      where: {
        id: artist_id
      },
      include: [ { model: AlbumModel, include: [SongModel] } ]
    })
  }

  @Post('/create')
  async create(@Body('data') data: ArtistDto[]): Promise<any> {
    return await this.artistService.createNew(data);
  }

  @Post(':id/delete')
  async delete(@Param('id') artist_id: number): Promise<number> {
    return await this.artistService.delete({
      where: {
        id: artist_id
      }
    })
  }

  @Post(':id/update')
  async update(@Param('id') artist_id: number, @Body('onUpdate') onUpdate: ArtistDto[]): Promise<boolean> {
    return await this.artistService.update({
      where: {
        id: artist_id
      }
    }, onUpdate)
  }
}
