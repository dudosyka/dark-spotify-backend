import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { SongGenreModel } from "../song/models/song.genre.model";
import { BaseService } from "../utils/base.service";
import { GenreDto } from "./genre.dto";
import { GenreModel } from "./models/genre.model";

@Injectable()
export class GenreService extends BaseService<GenreDto, typeof GenreModel> {
  constructor(@InjectModel(SongGenreModel) private songGenreModel: typeof SongGenreModel) {
    super('genres', 'genre_id', GenreModel, songGenreModel)
  }
}
