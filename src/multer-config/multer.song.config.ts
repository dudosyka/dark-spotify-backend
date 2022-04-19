import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ConvertMimetype } from "../song/convert.mimetype";

export class MulterSongConfig implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: '/home/dudosyka/Documents/dark-spotify-backend/files/songs',
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const name = `song_${Date.now()}.${ConvertMimetype.convert(file.mimetype)}`
          callback(null, name)
        }
      })
    }
  }
}
