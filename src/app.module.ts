import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SongModule } from './modules/song/song.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { GenreModule } from './modules/genre/genre.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { SequelizeModule } from "@nestjs/sequelize";
import {default as db_conf} from './conf/db_conf'
import { UserService } from "./modules/user/services/user.service";
import { AuthModule } from './modules/auth/auth.module';
import { MulterAvatarConfig } from './modules/multer-config/multer.avatar.config';
import { StreamModule } from './modules/stream/stream.module';
import { MongooseModule } from "@nestjs/mongoose";
import { MysqlExceptionService } from "./utils/mysql.exception.service";
import { MulterCoverConfig } from "./modules/multer-config/multer.cover.config";

@Module({
  imports: [UserModule, SongModule, AlbumModule, ArtistModule, PlaylistModule, GenreModule, RbacModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      ...db_conf,
      autoLoadModels: true,
      synchronize: true
    }),
    AuthModule,
    MulterAvatarConfig,
    MulterCoverConfig,
    StreamModule,
    MongooseModule.forRoot(
      "mongodb://localhost:27017",
      {
        dbName: "dark-spotify-db"
      })
  ],
  controllers: [AppController],
  providers: [AppService, UserService, MysqlExceptionService],
})
export class AppModule {}
