import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./models/user.model";
import { SongModel } from "../song/models/song.model";
import { UserSongModel } from "./models/user.song.model";
import { SongArtistModel } from "../song/models/song.artist.model";
import { SongAlbumModel } from "../song/models/song.album.model";
import { SongGenreModel } from "../song/models/song.genre.model";
import { ArtistModel } from "../artist/models/artist.model";
import { AlbumModel } from "../album/models/album.model";
import { GenreModel } from "../genre/models/genre.model";
import { ArtistGenreModel } from "../artist/models/artist.genre.model";
import { ArtistAlbumModel } from "../artist/models/artist.album.model";
import { AlbumTypeModel } from "../album/models/album.type.model";
import { AlbumGenreModel } from "../album/models/album.genre.model";
import { PlaylistModel } from "../playlist/models/playlist.model";
import { PlaylistUserModel } from "../playlist/models/playlist.user.model";
import { PlaylistSongModel } from "../playlist/models/playlist.song.model";
import { PlaylistGenreModel } from "../playlist/models/playlist.genre.model";
import { PlaylistVisibleTypeModel } from "../playlist/models/playlist.visible.type.model";
import { FriendModel } from "./models/friend.model";
import { SubscribeModel } from "./models/subscribe.model";

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
      ])
  ],
  providers: [UserService],
  exports: [
    SequelizeModule.forFeature(
      [
        UserModel, UserSongModel,
        SongModel, SongArtistModel, SongAlbumModel, SongGenreModel,
        ArtistModel, ArtistGenreModel, ArtistAlbumModel,
        AlbumModel, AlbumTypeModel,
        GenreModel
      ])
  ]
})
export class UserModule {}
