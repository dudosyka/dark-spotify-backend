import { SongDto } from "../modules/song/dtos/song.dto";
import { SongModel } from "../modules/song/models/song.model";

export class BaseService<ModelDto, ModelType> {
  constructor(private attr: string, private db_attr: string, private model: ModelType, private assignModel: any) {}

  async createNew(data: ModelDto[]) {
    const values = []
    for (let key in data) {
      const item = data[key]
      values.push(item)
    }
    // @ts-ignore
    return await this.model.bulkCreate(values);
  }

  public async getAll(query: {} = {}): Promise<ModelType[]> {
    // @ts-ignore
    return await this.model.findAll(query);
  }

  public async getOne(query: {}): Promise<ModelType> {
    // @ts-ignore
    return await this.model.findOne(query)
  }

  public async checkUnique(query: {}): Promise<boolean> {
    const check = await this.getOne(query);
    return check === null;
  }

  public async delete(query: {}): Promise<number> {
    // @ts-ignore
    return await this.model.destroy(query)
  }

  private convertArrayToIdKeyObject(data: ModelDto[]): {} {
    let res = {};
    for (let key in data) {
      let item = data[key]
      // @ts-ignore
      res[item.id] = item;
    }
    return res;
  }

  public async update(query, modelDto: ModelDto[]): Promise<boolean> {
    const data = this.convertArrayToIdKeyObject(modelDto)
    const ids = Object.keys(data);
    // @ts-ignore
    const onUpdate = await this.model.findAll(query)
    for (let key in onUpdate) {
      let model = onUpdate[key]
      if (ids.indexOf(model.id) != -1) {
        await model.update(data[model.id])
      }
    }
    return true
  }

  public async assignToSong(songs: Array<SongDto>, entities: SongModel[]): Promise<any[]> {
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

    // @ts-ignore
    return await this.assignModel.bulkCreate(values)
  }

}
