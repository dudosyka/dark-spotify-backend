import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { SongGenreModel } from "../../song/models/song.genre.model";
import { BaseService } from "../../../utils/base.service";
import { GenreDto } from "../dtos/genre.dto";
import { GenreModel } from "../models/genre.model";

@Injectable()
export class GenreService extends BaseService<GenreDto> {
  constructor(
    @InjectModel(SongGenreModel) private songGenreModel: typeof SongGenreModel,
    @InjectModel(GenreModel) private genreModel: typeof GenreModel
  ) {
      super("genres", "genre_id", genreModel, songGenreModel)
  }
}
