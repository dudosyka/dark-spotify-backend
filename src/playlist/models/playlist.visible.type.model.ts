import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

@Table
export class PlaylistVisibleTypeModel extends Model {
  @Column
  title: string
}
