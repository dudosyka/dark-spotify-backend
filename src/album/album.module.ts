import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
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
import { AlbumModel } from "./models/album.model";
import { AlbumTypeModel } from "./models/album.type.model";
import { AlbumGenreModel } from "./models/album.genre.model";
import { PlaylistModel } from "../playlist/models/playlist.model";
import { PlaylistUserModel } from "../playlist/models/playlist.user.model";
import { PlaylistSongModel } from "../playlist/models/playlist.song.model";
import { PlaylistGenreModel } from "../playlist/models/playlist.genre.model";
import { PlaylistVisibleTypeModel } from "../playlist/models/playlist.visible.type.model";
import { GenreModel } from "../genre/models/genre.model";
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumService],
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
  ],
  controllers: [AlbumController]
})
export class AlbumModule {}
