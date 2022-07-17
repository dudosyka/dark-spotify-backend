import { SongModel } from "../../song/models/song.model";
import { Op } from "sequelize";
import { UploadedFile } from "@nestjs/common";

export interface InputPlaylistDto {
  id?: number,
  name: string,
  songs: number[],
}

export interface CreatePlaylistDtoInterface {
  id?: number,
  name: string,
  songs: SongModel[],
  image?: string
}


export class CreatePlaylistDto {

  constructor(private data: InputPlaylistDto, @UploadedFile() private cover: Express.Multer.File | null) {}

  public async output(): Promise<CreatePlaylistDtoInterface> {
    const songs = await SongModel.findAll({
      where: {
        id: {
          [Op.in]: this.data.songs
        }
      }
    });
    return {
      name: this.data.name,
      songs: songs,
      image: this.cover?.filename
    }
  }
}

