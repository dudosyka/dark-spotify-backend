import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table
export class FriendModel extends Model {
  @Column
  @ForeignKey(() => UserModel)
  child: number

  @Column
  @ForeignKey(() => UserModel)
  parent: number

  @Column
  accepted: number
}
