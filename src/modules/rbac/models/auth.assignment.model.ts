import { Column, ForeignKey, Table } from "sequelize-typescript";
import { RuleModel } from "./rule.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class AuthAssignmentModel extends BaseModel {
  @Column
  @ForeignKey(() => RuleModel)
  child: number

  @Column
  @ForeignKey(() => RuleModel)
  parent: number
}
