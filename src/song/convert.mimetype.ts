export class ConvertMimetype {
  static convert(type: string): string {
    switch (type.split('/')[1]) {
      case 'mpeg':
        return 'mp3'
    }
  }
}
