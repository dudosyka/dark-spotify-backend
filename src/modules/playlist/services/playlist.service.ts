import { Injectable } from '@nestjs/common';
import { BaseService } from "../../../utils/base.service";
import { PlaylistModel } from "../models/playlist.model";
import { PlaylistDto } from "../dtos/playlist.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class PlaylistService extends BaseService<PlaylistDto>{
  constructor(
    @InjectModel(PlaylistModel) private playlistModel: typeof PlaylistModel
  ) { super("", "", playlistModel, null)
  }

}
