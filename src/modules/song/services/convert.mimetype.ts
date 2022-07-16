import { MulterError } from "multer";

export class ConvertMimetype {
  static convert(type: string): string {
    switch (type.split('/')[1]) {
      case 'mpeg':
        return 'mp3'
      default:
        throw new MulterError("LIMIT_UNEXPECTED_FILE")
    }
  }
}
