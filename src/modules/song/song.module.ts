import { Module } from "@nestjs/common";
import { SongService } from './services/song.service';
import { SongController } from './controllers/song.controller';
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
import { ArtistService } from "../artist/services/artist.service";
import { AlbumService } from "../album/services/album.service";
import { GenreService } from "../genre/services/genre.service";
import { StreamModule } from "../stream/stream.module";
import { PlaylistService } from "../playlist/services/playlist.service";
import { UserService } from "../user/services/user.service";
import { MysqlExceptionService } from "../../utils/mysql.exception.service";
import { AlbumUserModel } from '../album/models/album.user.model';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [
        UserModel, UserSongModel, FriendModel, SubscribeModel,
        SongModel, SongArtistModel, SongAlbumModel, SongGenreModel,
        ArtistModel, ArtistGenreModel, ArtistAlbumModel,
        AlbumModel, AlbumTypeModel, AlbumGenreModel, AlbumUserModel,
        PlaylistModel, PlaylistUserModel, PlaylistSongModel, PlaylistGenreModel, PlaylistVisibleTypeModel,
        GenreModel
    ]),
    MulterModule.registerAsync({
      useClass: MulterSongConfig
    }),
    StreamModule
  ],
  providers: [ SongService, GenreService, ArtistService, AlbumService, PlaylistService, UserService, MysqlExceptionService ],
  controllers: [SongController],
  exports: [ SongService, GenreService, ArtistService, AlbumService ]
})
export class SongModule {}
