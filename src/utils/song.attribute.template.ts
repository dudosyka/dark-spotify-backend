import { SongDto } from "../song/song.dto";
import { SongModel } from "../song/models/song.model";

export class SongAttributeTemplate {

  constructor(private attr: string, private db_attr: string, private model) {}

  public async assignToSong(songs: Array<SongDto>, entities: SongModel[]) {
    const values = []
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i]
      const entity = entities[i]
      for (let artist in song.artists) {
        values.push({
          song_id: entity.id,
          [this.db_attr]: song[this.attr][artist].id
        })
      }
    }

    return await this.model.bulkCreate(values)
  }
}
