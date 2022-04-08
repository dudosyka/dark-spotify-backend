import { Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { AlbumTypeModel } from "./album.type.model";

@Table
export class AlbumModel extends Model {
  @Column
  name: string

  @HasOne(() => AlbumTypeModel, 'album_type_id')
  @ForeignKey(() => AlbumTypeModel)
  type: AlbumTypeModel
}