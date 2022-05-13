import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { RuleModel } from "./rule.model";

@Table
export class AuthAssignmentMinModel extends Model {
  @Column
  @ForeignKey(() => RuleModel)
  child: number

  @Column
  @ForeignKey(() => RuleModel)
  parent: number
}
