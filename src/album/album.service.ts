import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from "@nestjs/common";
import { SongAlbumModel } from "../song/models/song.album.model";
import { SongAttributeTemplate } from "../utils/song.attribute.template";

@Injectable()
export class AlbumService extends SongAttributeTemplate{
  constructor(@InjectModel(SongAlbumModel) private songAlbumModel: typeof SongAlbumModel) {
    super("albums", "album_id", songAlbumModel);
  }
}
