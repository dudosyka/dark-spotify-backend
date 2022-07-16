import { SongDto } from "../modules/song/dtos/song.dto";
import { SongModel } from "../modules/song/models/song.model";
import { BaseModel } from "./base.model";
import { BaseDto } from "./base.dto";
import { FindOptions } from "sequelize";

export class BaseService<D extends BaseDto> {

  constructor(
    private attr: string,
    private db_attr: string,
    private model: typeof BaseModel,
    private assignModel: typeof BaseModel) {
  }

  async createNew(data: D[]) {
    const values = []
    for (let key in data) {
      const item = data[key]
      values.push(item)
    }

    return await this.model.bulkCreate(values);
  }

  public async getOne(query: {}): Promise<BaseModel> {
    return await this.model.findOne(query)
  }

  public async getAll(query: {} = {}): Promise<Array<BaseModel>> {
    return await this.model.findAll(query);
  }

  public async checkUnique(query: {}): Promise<boolean> {
    const check = await this.getOne(query);
    return check === null;
  }

  public async delete(query: {}): Promise<number> {
    return await this.model.destroy(query)
  }

  private convertArrayToIdKeyObject(data: D[]): {} {
    let res = {};
    for (let key in data) {
      let item = data[key]
      res[item.id] = item;
    }
    return res;
  }

  public async update(query: FindOptions, modelDto: D[]): Promise<boolean> {
    const data = this.convertArrayToIdKeyObject(modelDto)
    const ids = Object.keys(data).map(el => parseInt(el));
    // Check if it Array of data use it, if not request data from db
    const onUpdate: BaseModel[] | any = query[0] ? query : await this.model.findAll(query)
    for (let key in onUpdate) {
      let model = onUpdate[key]
      if (ids.indexOf(model.id) != -1) {
        await model.update(data[model.id], { where: { id: model.id } })
      }
    }
    return true
  }

  public async assignToSong(songs: Array<SongDto>, entities: SongModel[]): Promise<any[]> {
    const values = []
    entities.forEach((el, key) => {
      const song = el
      const entity = entities[key]
      for (let artist in song.artists) {
        values.push({
          song_id: entity.id,
          [this.db_attr]: song[this.attr][artist].id
        })
      }
    })

    return await this.assignModel.bulkCreate(values)
  }

}
