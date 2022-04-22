import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from "@nestjs/common";
import { SongAlbumModel } from "../song/models/song.album.model";
import { BaseService } from "../utils/base.service";
import { AlbumModel } from "./models/album.model";
import { AlbumDto } from "./album.dto";

@Injectable()
export class AlbumService extends BaseService<AlbumDto, typeof AlbumModel>{
  constructor(@InjectModel(SongAlbumModel) private songAlbumModel: typeof SongAlbumModel) {
    super("albums", "album_id", AlbumModel, songAlbumModel);
  }
}
