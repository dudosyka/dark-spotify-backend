import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { AlbumModel } from "../album/models/album.model";
import { SongModel } from "../song/models/song.model";
import { GenreDto } from "./genre.dto";
import { GenreModel } from "./models/genre.model";

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get('')
  async getGenres(): Promise<typeof GenreModel[]> {
    return await this.genreService.getAll()
  }

  @Get(':id')
  async getGenre(@Param('id') genre_id: number): Promise<typeof GenreModel> {
    return await this.genreService.getOne({
      where: {
        id: genre_id
      }
    })
  }

  @Get(':id/albums')
  async getGenreAlbums(@Param('id') genre_id: number): Promise<typeof GenreModel> {
    return await this.genreService.getOne({
      where: {
        id: genre_id
      },
      include: [ { model: AlbumModel } ]
    })
  }

  @Get(':id/songs')
  async getGenreSongs(@Param('id') genre_id: number): Promise<typeof GenreModel> {
    return await this.genreService.getOne({
      where: {
        id: genre_id
      },
      include: [ { model: AlbumModel, include: [ SongModel ] } ]
    })
  }

  @Post('/create')
  async create(@Body('data') data: GenreDto[]): Promise<any> {
    return await this.genreService.createNew(data);
  }

  @Post(':id/update')
  async update(@Param('id') genre_id: number, @Body('onUpdate') onUpdate: GenreDto[]): Promise<boolean> {
    return await this.genreService.update({
      where: {
        id: genre_id
      }
    }, onUpdate);
  }

  @Post(':id/delete')
  async delete(@Param('id') genre_id: number): Promise<number> {
    return await this.genreService.delete({
      where: {
        id: genre_id
      }
    })
  }
}
