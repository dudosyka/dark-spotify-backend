import { Module } from '@nestjs/common';
import { PlaylistService } from './services/playlist.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../user/models/user.model";
import { UserSongModel } from "../user/models/user.song.model";
import { FriendModel } from "../user/models/friend.model";
import { SubscribeModel } from "../user/models/subscribe.model";
import { SongModel } from "../song/models/song.model";
import { SongArtistModel } from "../song/models/song.artist.model";
import { SongAlbumModel } from "../song/models/song.album.model";
import { SongGenreModel } from "../song/models/song.genre.model";
import { ArtistModel } from "../artist/models/artist.model";
import { ArtistGenreModel } from "../artist/models/artist.genre.model";
import { ArtistAlbumModel } from "../artist/models/artist.album.model";
import { AlbumModel } from "../album/models/album.model";
import { AlbumTypeModel } from "../album/models/album.type.model";
import { AlbumGenreModel } from "../album/models/album.genre.model";
import { PlaylistModel } from "./models/playlist.model";
import { PlaylistUserModel } from "./models/playlist.user.model";
import { PlaylistSongModel } from "./models/playlist.song.model";
import { PlaylistGenreModel } from "./models/playlist.genre.model";
import { PlaylistVisibleTypeModel } from "./models/playlist.visible.type.model";
import { GenreModel } from "../genre/models/genre.model";
import { MulterModule } from "@nestjs/platform-express";
import { PlaylistController } from "./controllers/playlist.controller";
import { MulterCoverConfig } from "../multer-config/multer.cover.config";

@Module({
  imports: [
    SequelizeModule.forFeature(
    [
      UserModel, UserSongModel, FriendModel, SubscribeModel,
      SongModel, SongArtistModel, SongAlbumModel, SongGenreModel,
      ArtistModel, ArtistGenreModel, ArtistAlbumModel,
      AlbumModel, AlbumTypeModel, AlbumGenreModel,
      PlaylistModel, PlaylistUserModel, PlaylistSongModel, PlaylistGenreModel, PlaylistVisibleTypeModel,
      GenreModel
    ]),
    MulterModule.registerAsync({
      useClass: MulterCoverConfig
    }),
  ],
  providers: [PlaylistService],
  exports: [PlaylistService],
  controllers: [PlaylistController]
})
export class PlaylistModule {}
