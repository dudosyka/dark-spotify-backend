import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { SongArtistModel } from "../../song/models/song.artist.model";
import { BaseService } from "../../../utils/base.service";
import { ArtistDto } from "../dtos/artist.dto";
import { ArtistModel } from "../models/artist.model"

@Injectable()
export class ArtistService extends BaseService<ArtistDto>{
  constructor(
    @InjectModel(SongArtistModel) private songArtistModel: typeof SongArtistModel,
    @InjectModel(ArtistModel) private artistModel: typeof ArtistModel
  ) {
    super("artists", "artist_id", artistModel, songArtistModel)
  }
}
