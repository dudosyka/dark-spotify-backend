import { Injectable } from '@nestjs/common';
import { BaseService } from "../utils/base.service";
import { PlaylistModel } from "./models/playlist.model";
import { PlaylistDto } from "./playlist.dto";

@Injectable()
export class PlaylistService extends BaseService<PlaylistDto, typeof PlaylistModel>{
  constructor() { super('', '', PlaylistModel, null) }

}
