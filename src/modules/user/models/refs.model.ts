import { Column, ForeignKey, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class RefsModel extends BaseModel {
  @Column
  declare id: number

  @ForeignKey(() => UserModel)
  child: UserModel

  @ForeignKey(() => UserModel)
  parent: UserModel
}
