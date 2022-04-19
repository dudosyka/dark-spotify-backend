import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { SongArtistModel } from "../song/models/song.artist.model";
import { SongAttributeTemplate } from "../utils/song.attribute.template";

@Injectable()
export class ArtistService extends SongAttributeTemplate {
  constructor(@InjectModel(SongArtistModel) private songArtistModel: typeof SongArtistModel) {
    super('artists', 'artist_id', songArtistModel)
  }
}
