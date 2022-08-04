import { InjectModel } from "@nestjs/sequelize";
import { Injectable } from "@nestjs/common";
import { SongAlbumModel } from "../../song/models/song.album.model";
import { BaseService } from "../../../utils/base.service";
import { AlbumModel } from "../models/album.model";
import { AlbumDto } from "../dtos/album.dto";
import { AlbumTypeModel } from "../models/album.type.model";
import { SongModel } from "../../song/models/song.model";
import { AlbumUserModel } from '../models/album.user.model';
import sequelize from 'sequelize';

@Injectable()
export class AlbumService extends BaseService<AlbumDto>{
  constructor(
    @InjectModel(SongAlbumModel) private songAlbumModel: typeof SongAlbumModel,
    @InjectModel(AlbumModel) private albumModel: typeof AlbumModel,
    @InjectModel(AlbumUserModel) private albumUserModel: typeof AlbumUserModel,
  ) {
    super("albums", "album_id", albumModel, songAlbumModel);
  }

  async setPlayed(user_id: number, album_id: number): Promise<void> {
    const model = await this.albumUserModel.findOne({
      where: { user_id, album_id }
    });
    if (!model) {
      await this.albumUserModel.create({
        user_id, album_id, listen_count: 1
      })
    } else {
      await AlbumUserModel.update({ listen_count: sequelize.literal('listen_count + ' + 1) }, { where: { user_id, album_id }});
    }
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
