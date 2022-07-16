import { Column, Table } from "sequelize-typescript";
import { BaseModel } from "../../../utils/base.model";

@Table
export class PlaylistVisibleTypeModel extends BaseModel
{
  @Column
  title: string
}
