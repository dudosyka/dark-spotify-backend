import { BelongsToMany, Column, Table } from "sequelize-typescript";
import { AuthAssignmentMinModel } from "./auth.assignment.min.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class RuleModel extends BaseModel {
  @Column
  name: string

  @Column
  description: String

  @BelongsToMany(() => RuleModel, () => AuthAssignmentMinModel, 'parent')
  childRules: RuleModel[]
}
