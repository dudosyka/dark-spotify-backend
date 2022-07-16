import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Stream, StreamDocument } from "../models/stream.model";
import { Model } from "mongoose";
import { CreateStreamDto } from "../dtos/create.stream.dto";
import { OutputStreamDto } from "../dtos/output.stream.dto";
import { SongService } from "../../song/services/song.service";
import { AlbumService } from "../../album/services/album.service";
import { createReadStream, ReadStream } from "fs";
import { StreamInsertPosition, StreamInsertType, UpdateStreamDto } from "../dtos/update.stream.dto";
import { PlaylistService } from "../../playlist/services/playlist.service";
import { Op } from "sequelize";
import { SongModel } from "../../song/models/song.model";

class StreamPlaylistManager {
  constructor(private streamModel: StreamDocument, private playlistService: PlaylistService, private albumService: AlbumService) {}

  async insert(updateDto: UpdateStreamDto) {
    let data = updateDto.insertPosition == StreamInsertPosition.newQueue ? {
      playList: [],
      onPlay: this.streamModel.onPlay
    } : {
      playList: this.streamModel.playList,
      onPlay: this.streamModel.onPlay
    }

    if (updateDto.insertType == StreamInsertType.Song) {
      if (updateDto.insertPosition == StreamInsertPosition.afterPlay) {
        for (let key in updateDto.value) {
          data.playList.splice(this.streamModel.onPlay.playlistPosition + parseInt(key) + 1, 0, updateDto.value[key])
        }
      }
      else {
        updateDto.value.map(el => {
          data.playList.push(el);
        });
        if (updateDto.insertPosition == StreamInsertPosition.newQueue) {
          data.onPlay = {
            playlistPosition: 0,
            songId: updateDto.value[0]
          };
        }
      }
      return data;
    }

    let songs: any;
    switch (updateDto.insertType) {
      case StreamInsertType.Playlist:
        songs = (await this.playlistService.getOne({
          where: {
            id: updateDto.value[0],
          },
          include: [ SongModel ]
        }))['songs'];
        break;
      case StreamInsertType.Album:
        songs = (await this.albumService.getOne({
          where: {
            id: updateDto.value[0],
          },
          include: [ SongModel ]
        }))['songs'];
    }
    console.log(songs);
    if (updateDto.insertPosition == StreamInsertPosition.afterPlay) {
      for (let key in songs) {
        data.playList.splice(this.streamModel.onPlay.playlistPosition + parseInt(key) + 1, 0, songs[key].id);
      }
    }
    else {
      songs.map(el => {
        data.playList.push(el.id)
      });
      if (updateDto.insertPosition == StreamInsertPosition.newQueue) {
        data.onPlay = {
          playlistPosition: 0,
          songId: songs[0].id
        };
      }
    }

    return data;
  }
}

@Injectable()
export class StreamService {

  constructor(
    @InjectModel(Stream.name) private streamModel: Model<StreamDocument>,
    private albumService: AlbumService,
    private playlistService: PlaylistService,
    private songService: SongService
  ) {
  }

  async create(data: CreateStreamDto): Promise<StreamDocument> {
    const created = new this.streamModel(data);
    return await created.save()
  }

  async play(user_id: number, updateDto: UpdateStreamDto) {
    return await this.findByUser(user_id)
      .then(async stream => {
        return await this.append(stream._id, updateDto);
      })
      .catch(async () => {
      return await this.append((await this.create({
        userId: user_id,
        onPlay: {
          playlistPosition: 0,
          songId: 0,
        },
        playList: [],
        album: null
      }))._id, updateDto);
    });
  }

  async findOne(id: string): Promise<StreamDocument> | never {
    const res = await this.streamModel.findOne({ _id: id }).exec();
    if (res === null)
      throw new NotFoundException()
    return res;
  }

  async findByUser(user_id: number): Promise<StreamDocument> | never {
    const res = await this.streamModel.findOne({ user_id: user_id }).exec();
    if (res === null)
      throw new NotFoundException()
    return res;
  }

  async update(id: string, data: any) {
    return this.streamModel.updateOne({
      _id: id
    }, data);
  }

  async remove(id: string): Promise<any> {
    return await this.streamModel.remove({ id: id }).exec();
  }

  async append(id: string, updateDto: UpdateStreamDto): Promise<string> {
    const stream = await this.findOne(id);
    const streamPlaylist = new StreamPlaylistManager(stream, this.playlistService, this.albumService);

    let data = await streamPlaylist.insert(updateDto)

    await this.streamModel.updateOne({ _id: id }, data).exec();
    return stream._id;
  }

  async info(id: string): Promise<OutputStreamDto> {
    const stream = await this.findOne(id);
    const onPlay = {
      playlistPosition: stream.onPlay.playlistPosition,
      song: await this.songService.getOne({ where: { id: stream.onPlay.songId } })
    }
    const data = await this.songService.getAll({
        where: {
          id: {
            [Op.in]: stream.playList
          }
        }
    });
    let objPlaylist = {};
    data.map(el => {
      // @ts-ignore
      objPlaylist[el.id] = {...el}
    })
    const playList = []
    stream.playList.map(el => {
      playList.push(objPlaylist[el].dataValues)
    })
    if (!stream.album)
      return { onPlay, playList, album: null }
    else {
      const album = await this.albumService.getOne({ where: {id: stream.album} })
      return { onPlay, playList, album }
    }
  }

  async getOnPlay(id: string): Promise<ReadStream> | never {
    const onPlay = (await this.findOne(id)).onPlay;
    const song = await this.songService.getOne({ where: { id: onPlay.songId } });
    return createReadStream(song['path'])
  }

  async next(id: string): Promise<ReadStream> {
    const stream = await this.findOne(id);
    const onPlay = stream.onPlay.playlistPosition;
    const newPos = (onPlay == stream.playList.length - 1) ? 0 : onPlay + 1;
    await this.update(id, {
      onPlay: {
        playlistPosition: newPos,
        songId: stream.playList[newPos]
      }
    });
    return await this.getOnPlay(id);
  }

  async prev(id: string): Promise<ReadStream> {
    const stream = await this.findOne(id);
    const onPlay = stream.onPlay.playlistPosition;
    const newPos = (onPlay == 0) ? stream.playList.length - 1 : onPlay - 1;
    await this.update(id, {
      onPlay: {
        playlistPosition: newPos,
        songId: stream.playList[newPos]
      }
    });
    return await this.getOnPlay(id);
  }
}
