import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { MulterModule } from "@nestjs/platform-express";
import { MulterSongConfig } from "../multer-config/multer.song.config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../user/models/user.model";
import { UserSongModel } from "../user/models/user.song.model";
import { FriendModel } from "../user/models/friend.model";
import { SubscribeModel } from "../user/models/subscribe.model";
import { SongModel } from "./models/song.model";
import { SongArtistModel } from "./models/song.artist.model";
import { SongAlbumModel } from "./models/song.album.model";
import { SongGenreModel } from "./models/song.genre.model";
import { ArtistModel } from "../artist/models/artist.model";
import { ArtistGenreModel } from "../artist/models/artist.genre.model";
import { ArtistAlbumModel } from "../artist/models/artist.album.model";
import { AlbumModel } from "../album/models/album.model";
import { AlbumTypeModel } from "../album/models/album.type.model";
import { AlbumGenreModel } from "../album/models/album.genre.model";
import { PlaylistModel } from "../playlist/models/playlist.model";
import { PlaylistUserModel } from "../playlist/models/playlist.user.model";
import { PlaylistSongModel } from "../playlist/models/playlist.song.model";
import { PlaylistGenreModel } from "../playlist/models/playlist.genre.model";
import { PlaylistVisibleTypeModel } from "../playlist/models/playlist.visible.type.model";
import { GenreModel } from "../genre/models/genre.model";
import { ArtistModule } from "../artist/artist.module";
import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";
import { GenreService } from "../genre/genre.service";
import { AlbumModule } from "../album/album.module";
import { GenreModule } from "../genre/genre.module";
import { StreamModule } from "../stream/stream.module";
import { StreamService } from "../stream/stream.service";
import { PlaylistService } from "../playlist/playlist.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Stream, StreamSchema } from "../stream/models/stream.model";

@Module({
  providers: [SongService, ArtistService, AlbumService, GenreService, PlaylistService, StreamService],
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
    ArtistModule, AlbumModule, GenreModule,
    MulterModule.registerAsync({
      useClass: MulterSongConfig
    }),
    MongooseModule.forFeature([ {name: Stream.name, schema: StreamSchema} ]),
    StreamModule
  ],
  controllers: [SongController],
  exports: [ ArtistService, AlbumService, GenreService ]
})
export class SongModule {}
