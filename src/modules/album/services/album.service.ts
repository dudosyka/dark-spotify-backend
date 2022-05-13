import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { SongAlbumModel } from "../../song/models/song.album.model";
import { BaseService } from "../../../utils/base.service";
import { AlbumModel } from "../models/album.model";
import { AlbumDto } from "../dtos/album.dto";
import { AlbumTypeModel } from "../models/album.type.model";
import { SongModel } from "../../song/models/song.model";

@Injectable()
export class AlbumService extends BaseService<AlbumDto, typeof AlbumModel>{
  constructor(
    @InjectModel(SongAlbumModel) private songAlbumModel: typeof SongAlbumModel,
  ) {
    super("albums", "album_id", AlbumModel, songAlbumModel);
  }

  async getSongs(album_id: number): Promise<typeof AlbumModel> {
    return await this.getOne({
      where: {
        id: album_id
      },
      include: [AlbumTypeModel, SongModel]
    })
  }

}
