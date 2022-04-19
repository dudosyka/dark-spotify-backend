import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { SongGenreModel } from "../song/models/song.genre.model";
import { SongAttributeTemplate } from "../utils/song.attribute.template";

@Injectable()
export class GenreService extends SongAttributeTemplate {
  constructor(@InjectModel(SongGenreModel) private songGenreModel: typeof SongGenreModel) {
    super('genres', 'genre_id', songGenreModel)
  }
}
