import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stream, StreamDocument } from "./models/stream.model";
import { Model } from "mongoose";
import { CreateStreamDto } from "./create.stream.dto";
import { OutputStreamDto } from "./output.stream.dto";
import { SongService } from "../song/song.service";
import { AlbumService } from "../album/album.service";
import { createReadStream, ReadStream } from "fs";
import { UpdateStreamDto, UpdateStreamType } from "./update.stream.dto";
import { PlaylistService } from "../playlist/playlist.service";
import { SongModel } from "../song/models/song.model";

@Injectable()
export class StreamService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<StreamDocument>,
    private songService: SongService,
    private albumService: AlbumService,
    private playlistService: PlaylistService,
  ) {}

  async create(data: CreateStreamDto): Promise<StreamDocument> {
    const created = new this.streamModel(data);
    console.log(created)
    return await created.save()
  }

  async findOne(id: string): Promise<StreamDocument> {
    return await this.streamModel.findOne({ _id: id }).exec();
  }

  async findByUser(user_id: number): Promise<StreamDocument> {
    return await this.streamModel.findOne({ user_id: user_id }).exec();
  }

  async update(id: string, data: any) {
    return this.streamModel.updateOne({
      id: id
    }, data);
  }

  async remove(id: string): Promise<any> {
    return await this.streamModel.remove({ id: id }).exec();
  }

  async append(id: string, updateDto: UpdateStreamDto): Promise<any> {
    const stream = await this.findOne(id);
    let data = {
      playList: stream.playList
    }
    if (updateDto.type == UpdateStreamType.SongEnd) {
      data.playList = Array.apply(data.playList, updateDto.value)
    }
    if (updateDto.type == UpdateStreamType.SongAfterPlay) {
      for (let key in updateDto.value) {
        data.playList.splice(stream.onPlay.playlistPosition + parseInt(key), 0, updateDto.value[key])
      }
    }
    if (updateDto.type == UpdateStreamType.PlayListEnd || updateDto.type == UpdateStreamType.PlaylistAfterPlay) {
      const playlist = await this.playlistService.getOne({
        where: {
          id: updateDto.value[0],
        },
        include: [ SongModel ]
      });
      if (updateDto.type == UpdateStreamType.PlayListEnd)
        //@ts-ignore
        Array.apply(data.playList, playlist.songs.map(el => el.id))
      else {
        //@ts-ignore
        for (let key in playlist.songs) {
          //@ts-ignore
          data.playList.splice(stream.onPlay.playlistPosition + parseInt(key), 0, playlist.songs[key].id)
        }
      }
    }

    return await this.streamModel.updateOne({ id: id }, data).exec();
  }

  async info(id: string): Promise<OutputStreamDto> {
    const stream = await this.findOne(id);
    const onPlay = await this.songService.getOne({ where: { id: stream.onPlay.songId } })
    const playList = await this.songService.getAll({
        where: {
          id: {
            in: stream.playList
          }
        }
    });
    if (stream.album == 0)
      return { onPlay, playList, album: null }
    else {
      const album = await this.albumService.getOne({ where: {id: stream.album} })
      return { onPlay, playList, album }
    }
  }

  async getOnPlay(id: string): Promise<ReadStream> {
    const onPlay = (await this.findOne(id)).onPlay;
    const song = await this.songService.getOne({ where: { id: onPlay.songId } });
    return createReadStream(song['path'])
  }

  async next(id: string): Promise<ReadStream> {
    const stream = await this.findOne(id);
    const onPlay = stream.onPlay.playlistPosition;
    await this.update(id, {
      onPlay: {
        playlistPosition: onPlay + 1,
        songId: stream.playList[onPlay]
      }
    });
    return await this.getOnPlay(id);
  }
}
