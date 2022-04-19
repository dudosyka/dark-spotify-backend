import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";

export class MulterConfigModule implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: '/home/dudosyka/Documents/dark-spotify-backend/files/avatars',
        filename(req, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const name = `avatar_${req.user['user']}.${file.mimetype.split('/')[1]}`;
          callback(null, name);
        }
      })
    }
  }
}
