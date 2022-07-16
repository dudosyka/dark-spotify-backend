import { Column, ForeignKey, Table } from "sequelize-typescript";
import { UserModel } from "../../user/models/user.model";
import { RuleModel } from "./rule.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class UserRuleModel extends BaseModel {
  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  @ForeignKey(() => RuleModel)
  rule_id: number
}
