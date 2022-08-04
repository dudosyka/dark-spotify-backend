import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InputPlaylistDto } from '../dtos/create.playlist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlaylistService } from '../services/playlist.service';
import { AuthGuard } from '@nestjs/passport';
import { HttpNotFoundException } from '../../../exceptions/http.not.found.exception';
import { PlaylistModel } from '../models/playlist.model';
import { SongModel } from '../../song/models/song.model';
import { StreamService } from '../../stream/services/stream.service';
import { StreamInsertPosition, StreamInsertType } from '../../stream/dtos/update.stream.dto';

@Controller('playlist')
@UseGuards(AuthGuard('jwt'))
export class PlaylistController {
  constructor(
    private playlistService: PlaylistService,
    private streamService: StreamService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('cover'))
  public async createPlaylist(@Req() req, @Body('playlist') data: string, @UploadedFile() cover: Express.Multer.File | null): Promise<{ playlist: { id: number } }> | never {
    const playlist: InputPlaylistDto = JSON.parse(data);
    return {
      playlist: {
        id: await this.playlistService.create(playlist, cover, req.user.user)
      }
    };
  }

  @Get(':id')
  public async playlist(@Req() req, @Param('id') playlistId: number): Promise<PlaylistModel> | never {
    return this.playlistService.get({ id: playlistId }, [ { model: SongModel } ] );
  }

  @Delete('/:id')
  public async remove(@Req() req, @Param('id') playlistId: number): Promise<boolean> | never {
    return this.playlistService.removePlaylist(playlistId, req.user.user).catch(err => {
      throw new HttpNotFoundException(err.message);
    });
  }

  @Post(':id/play')
  public async play(@Req() req, @Param('id') playlistId: number): Promise<string> | never {
    await this.playlistService.setPlayed(req.user.user, playlistId);
    return this.streamService.play(req.user.user, {
      insertPosition: StreamInsertPosition.newQueue,
      insertType: StreamInsertType.Playlist,
      value: [playlistId]
    })
  }

  @Post('/:id/append')
  public async appendSongsToPlaylist(@Req() req, @Param('id') playlistId: number, @Body('songs') songs: number[]): Promise<boolean> | never {
    return this.playlistService.appendSongs(playlistId, songs, req.user.user).catch(err => {
      if (err.message != 'Http Forbidden Exception')
        throw new HttpNotFoundException(err.message);
      else
        throw err;
    });
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('cover'))
  public async update(@Req() req, @Param('id') playlistId: number, @Body('playlist') data: string, @UploadedFile() cover: Express.Multer.File | null): Promise<boolean> | never {
    const playlistDto: InputPlaylistDto = JSON.parse(data ? data : "{}");
    playlistDto.id = playlistId;
    return this.playlistService.updatePlaylist(playlistDto, cover, req.user.user).catch(err => {
      throw err;
    });
  }

  @Delete('/:id/songs')
  public async removeSongs(@Req() req, @Param('id') playlistId: number, @Body('songs') songs: number[]): Promise<boolean> | never {
    return this.playlistService.removeFromPlaylist(playlistId, songs, req.user.user).catch(err => {
      throw new HttpNotFoundException(err.message);
    });
  }

}
