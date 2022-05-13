import { Column, Model, Table } from "sequelize-typescript";

@Table
export class AlbumTypeModel extends Model {
  @Column
  title: string
}
