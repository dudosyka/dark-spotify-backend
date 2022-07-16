import { AutoIncrement, Column, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class FriendModel extends BaseModel {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  @ForeignKey(() => UserModel)
  child: number

  @Column
  @ForeignKey(() => UserModel)
  parent: number

  @Column
  accepted: number
}
