import { Injectable, UploadedFiles } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SongModel } from "../models/song.model";
import { SongDto } from "../dtos/song.dto";
import { ArtistService } from "../../artist/services/artist.service";
import { AlbumService } from "../../album/services/album.service";
import { GenreService } from "../../genre/services/genre.service";
import { BaseService } from "../../../utils/base.service";

@Injectable()
export class SongService extends BaseService<SongDto>{
  constructor(
    @InjectModel(SongModel) private songModel: typeof SongModel,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private genreService: GenreService
  ) {
    super("", "", songModel, null)
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

    const result = await SongModel.bulkCreate(values)
    await this.artistService.assignToSong(songsData, result);
    await this.albumService.assignToSong(songsData, result);
    await this.genreService.assignToSong(songsData, result);
    return values;
  }
}
