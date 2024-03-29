import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { filesConstants } from "../../conf/constants";

export class MulterAvatarConfig implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: filesConstants.avatar,
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const name = `avatar_${req.user['user']}.${file.mimetype.split('/')[1]}`;
          callback(null, name);
        }
      })
    }
  }
}
