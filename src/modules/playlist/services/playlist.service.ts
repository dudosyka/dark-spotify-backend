import { Injectable } from '@nestjs/common';
import { BaseService } from "../../../utils/base.service";
import { PlaylistModel } from "../models/playlist.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePlaylistDto, CreatePlaylistDtoInterface, InputPlaylistDto } from "../dtos/create.playlist.dto";
import { PlaylistSongModel } from "../models/playlist.song.model";
import { SongModel } from "../../song/models/song.model";
import sequelize, { Op } from "sequelize";
import { PlaylistUserModel } from "../models/playlist.user.model";
import { HttpNotFoundException } from "../../../exceptions/http.not.found.exception";
import { InputPlaylistOnUpdate, UpdatePlaylistDto } from "../dtos/update.playlist.dto";
import { HttpForbiddenException } from "../../../exceptions/http.forbidden.exception";
import * as fs from "fs";
import { filesConstants } from "../../../conf/constants";

@Injectable()
export class PlaylistService extends BaseService<CreatePlaylistDtoInterface>{
  constructor(
    @InjectModel(PlaylistModel) private playlistModel: typeof PlaylistModel,
    @InjectModel(PlaylistSongModel) private playlistSongModel: typeof PlaylistSongModel,
    @InjectModel(PlaylistUserModel) private playlistUserModel: typeof PlaylistUserModel,
  ) {
    super("", "", playlistModel, null)
  }

  public async get(query: {}, include: {}[]): Promise<PlaylistModel> {
    return this.playlistModel.findOne({
      where: query,
      include
    }).then(data => {
      if (data != null)
        return data;
      else
        throw new HttpNotFoundException("Playlist not found");
    })
  }

  public async create(playlist: InputPlaylistDto, cover: Express.Multer.File, userId: number): Promise<number> {
    const createDto = new CreatePlaylistDto(playlist, cover);
    const onCreate = await createDto.output();
    const created = (await this.createNew([onCreate]))[0].id;
    let values = []
    onCreate.songs.map(el => {
      values.push({
        song_id: el.id,
        playlist_id: created
      })
    });
    await this.playlistUserModel.create({
      user_id: userId,
      playlist_id: created,
      owner: true
    });
    await this.playlistSongModel.bulkCreate(values);
    return created;
  }

  public async updatePlaylist(playlistDto: InputPlaylistOnUpdate, cover: Express.Multer.File, userId: number): Promise<boolean> | never {
    const playlist = await this.playlistModel.findOne({where: { id: playlistDto.id } });
    if (!playlist)
      throw new HttpNotFoundException(`Playlist ${playlistDto.id} not found.`);
    if (!(await PlaylistModel.checkOwner(playlistDto.id, userId)))
      throw new HttpForbiddenException('Forbidden');

    if (cover && playlist.image) {
      await fs.unlinkSync(`${filesConstants.playlistCover}/${playlist.image}`);
    }

    const dto = new UpdatePlaylistDto(playlistDto, cover);
    const onUpdate = await dto.output();

    if (onUpdate.songs) {
      await this.playlistSongModel.destroy({ where: { playlist_id: playlist.id} });
      let values = []

      let newDuration = 0
      onUpdate.songs.map(el => {
        values.push({
          song_id: el.id,
          playlist_id: playlist.id
        })
        newDuration += el.duration;
      });

      await playlist.update({ ...onUpdate, duration: newDuration });
      await this.playlistSongModel.bulkCreate(values);
    }

    return true;
  }

  public async appendSongs(playlistId: number, songs: number[], userId: number): Promise<boolean> | never {
    const playlist = await this.playlistModel.findOne({ where: { id: playlistId }, include: [ SongModel ] });
    if (!playlist)
      throw Error(`Playlist ${playlistId} not found`);
    if (!(await PlaylistModel.checkOwner(playlistId, userId)))
      throw new HttpForbiddenException('Forbidden');

    const onAppend = songs.filter(el => !playlist.checkSongExists(el));

    const append = await SongModel.findAll({
      where: {
        id: {
          [Op.in]: onAppend
        }
      }
    });


    if (playlist) {
      let values = [];
      let appendDuration = 0;

      append.map(el => {
        appendDuration += el.duration;
        values.push({
          song_id: el.id,
          playlist_id: playlist.id
        })
      })
      playlist.duration += appendDuration;

      await playlist.save();
      await this.playlistSongModel.bulkCreate(values);
      return true;
    } else {
      throw Error('Playlist not found.');
    }
  }

  public async removeFromPlaylist(playlistId: number, songs: number[], userId: number): Promise<boolean> {
    const playlist = await this.playlistModel.findOne({ where: { id: playlistId } });
    if (!playlist)
      throw Error(`Playlist ${playlistId} not found`);
    if (!(await PlaylistModel.checkOwner(playlistId, userId)))
      throw new HttpForbiddenException('Forbidden');

    const deletedSongs = await SongModel.findAll({
      where: {
        id: {
          [Op.in]: songs
        }
      }
    });

    let deletedDuration = 0;
    deletedSongs.map(el => {
      deletedDuration += el.duration;
    });

    const deleted = await this.playlistSongModel.destroy({
      where: {
        playlist_id: playlistId,
        song_id: {
          [Op.in]: songs
        }
      }
    })
    playlist.duration -= deletedDuration;
    await playlist.save();

    return deleted != 0;
  }

  public async removePlaylist(playlistId: number, userId: number): Promise<boolean> {
    const playlist = await this.playlistModel.findOne({ where: { id: playlistId } });
    if (!playlist)
      throw Error(`Playlist ${playlistId} not found`);
    if (!(await PlaylistModel.checkOwner(playlistId, userId)))
      throw new HttpForbiddenException('Forbidden');

    const deleted = await this.playlistModel.destroy({ where: { id: playlistId } });

    return deleted != 0;
  }

  async setPlayed(userId: number, playlistId: number): Promise<void> {
    const model = await this.playlistUserModel.findOne({
      where: {
        user_id: userId,
        playlist_id: playlistId
      }
    });

    if (!model) {
      await this.playlistUserModel.create({
        user_id: userId,
        playlist_id: playlistId,
        listen_count: 1,
      });
    } else {
      await PlaylistUserModel.update({ listen_count: sequelize.literal('listen_count + ' + 1) }, { where: { user_id: userId, playlist_id: playlistId }});
    }
  }
}
