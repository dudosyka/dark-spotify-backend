import { SongModel } from "../../song/models/song.model";
import { Op } from "sequelize";
import { UploadedFile } from "@nestjs/common";

export interface InputPlaylistOnUpdate {
  id?: number,
  name?: string,
  songs?: number[],
}

export interface UpdatePlaylistDtoInterface {
  id?: number,
  name?: string,
  songs?: SongModel[],
  image?: string
}


export class UpdatePlaylistDto {

  constructor(private data: InputPlaylistOnUpdate, @UploadedFile() private cover: Express.Multer.File | null) {}

  public async output(): Promise<UpdatePlaylistDtoInterface> {
    let songs = null;
    if (this.data.songs) {
      songs = await SongModel.findAll({
        where: {
          id: {
            [Op.in]: this.data.songs
          }
        }
      });
    }
    return {
      name: this.data.name,
      songs: songs,
      image: this.cover?.filename
    }
  }
}

