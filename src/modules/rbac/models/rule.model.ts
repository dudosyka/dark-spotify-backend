import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { AuthAssignmentMinModel } from "./auth.assignment.min.model";

@Table
export class RuleModel extends Model {
  @Column
  name: string

  @Column
  description: String

  @BelongsToMany(() => RuleModel, () => AuthAssignmentMinModel, 'parent')
  childRules: RuleModel[]
}
