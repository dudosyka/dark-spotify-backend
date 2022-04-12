import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "../../user/models/user.model";
import { RuleModel } from "./rule.model";

@Table
export class UserRuleModel extends Model {
  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  @ForeignKey(() => RuleModel)
  rule_id: number
}
