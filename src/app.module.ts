import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SongModule } from './song/song.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { PlaylistModule } from './playlist/playlist.module';
import { GenreModule } from './genre/genre.module';
import { RbacModule } from './rbac/rbac.module';
import { SequelizeModule } from "@nestjs/sequelize";
import {default as db_conf} from './db_conf'
import { UserService } from "./user/user.service";
import { AuthModule } from './auth/auth.module';
import { MulterAvatarConfig } from './multer-config/multer.avatar.config';
import { StreamModule } from './stream/stream.module';
import { MongooseModule } from "@nestjs/mongoose";

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
    StreamModule,
    MongooseModule.forRoot("mongodb://localhost/dark-spotify-db/stream")
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
