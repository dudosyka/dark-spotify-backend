import { Injectable, UploadedFiles } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SongModel } from "./models/song.model";
import { SongDto } from "./song.dto";
import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";
import { GenreService } from "../genre/genre.service";
import { BaseService } from "../utils/base.service";

@Injectable()
export class SongService extends BaseService<SongDto, typeof SongModel>{
  constructor(
    @InjectModel(SongModel) private songModel: typeof SongModel,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private genreService: GenreService
  ) {
    super('', '', SongModel, null)
  }

  public async upload(@UploadedFiles() songs: Array<Express.Multer.File>, songsData: Array<SongDto>): Promise<Array<SongDto>> {
    const values = [];

    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      if (songsData[i]) {
        const songData = songsData[i];
        values.push({
          name: songData.name,
          path: song.path,
        });
      }
      else {
        values.push({
          name: "Unnamed song",
          path: song.path
        })
      }
    }

    const result = await this.songModel.bulkCreate(values)
    await this.artistService.assignToSong(songsData, result);
    await this.albumService.assignToSong(songsData, result);
    await this.genreService.assignToSong(songsData, result);
    return values;
  }
}
