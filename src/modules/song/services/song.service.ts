import { Injectable, UploadedFiles } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SongModel } from "../models/song.model";
import { SongDto } from "../dtos/song.dto";
import { ArtistService } from "../../artist/services/artist.service";
import { AlbumService } from "../../album/services/album.service";
import { GenreService } from "../../genre/services/genre.service";
import { BaseService } from "../../../utils/base.service";
const getMP3Duration = require('get-mp3-duration');
import * as fs from "fs";

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
    songs.forEach((el, key) => {
      const song = el;
      const buffer = fs.readFileSync(song.path);
      const duration = getMP3Duration(buffer);
      if (songsData[key]) {
        const songData = songsData[key];
        values.push({
          name: songData.name,
          path: song.path,
          duration: (duration * 1000)
        });
      }
      else {
        values.push({
          name: "Unnamed song",
          path: song.path,
          duration: (duration / 1000)
        })
      }
    })

    const result = await this.songModel.bulkCreate(values);
    await this.artistService.assignToSong(songsData, result);
    await this.albumService.assignToSong(songsData, result);
    await this.genreService.assignToSong(songsData, result);
    return values;
  }
}
