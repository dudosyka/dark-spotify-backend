import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table
export class RefsModel extends Model {
  @Column
  declare id: number

  @ForeignKey(() => UserModel)
  child: UserModel

  @ForeignKey(() => UserModel)
  parent: UserModel
}
