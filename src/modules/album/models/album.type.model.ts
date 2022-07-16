import { Column, Table } from "sequelize-typescript";
import { BaseModel } from "../../../utils/base.model";

@Table
export class AlbumTypeModel extends BaseModel {
  @Column
  title?: string
}
