import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../user/models/user.model";
import { RuleModel } from "./models/rule.model";
import { AccessControl } from './access.control'
import { default as db_conf } from "../db_conf";

@Injectable()
export class RbacService {
  private accessControl: AccessControl;
  constructor(
    @InjectModel (UserModel) private userModel: typeof UserModel,
  ) {
    this.accessControl = new AccessControl(
      {
        auth_assignment: 'AuthAssignmentModels',
        auth_assignment_min: 'AuthAssignmentMinModels',
        rule_entity: 'RuleModels',
        user_rule: 'UserRuleModels',
      }, {
        ...db_conf,
        user: db_conf.username
      })
  }

  public async getRights(userId: number): Promise<any[][]> {
    const res = await this.userModel.findOne({
      where: {
        id: userId
      },
      include: [{model: RuleModel, include: [ RuleModel ]}]
    });
    let rights = []
    res.rules.map(el => {
      rights = rights.concat(el.childRules.map(el => el.id))
    });

    return rights;
  }
}
