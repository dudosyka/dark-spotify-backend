import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { filesConstants } from "../../conf/constants";

export class MulterCoverConfig implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: filesConstants.playlistCover,
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const name = `cover_${Date.now()}.${file.mimetype.split('/')[1]}`;
          callback(null, name);
        }
      })
    }
  }
}
