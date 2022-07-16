import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { SongAlbumModel } from "../../song/models/song.album.model";
import { BaseService } from "../../../utils/base.service";
import { AlbumModel } from "../models/album.model";
import { AlbumDto } from "../dtos/album.dto";
import { AlbumTypeModel } from "../models/album.type.model";
import { SongModel } from "../../song/models/song.model";

@Injectable()
export class AlbumService extends BaseService<AlbumDto>{
  constructor(
    @InjectModel(SongAlbumModel) private songAlbumModel: typeof SongAlbumModel,
    @InjectModel(AlbumModel) private albumModel: typeof AlbumModel,
  ) {
    super("albums", "album_id", albumModel, songAlbumModel);
  }

  async getSongs(album_id: number): Promise<AlbumModel> {
    return await this.getOne({
      where: {
        id: album_id
      },
      include: [AlbumTypeModel, SongModel]
    })
  }

}
