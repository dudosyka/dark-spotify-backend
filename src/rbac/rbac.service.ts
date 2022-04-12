import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../user/models/user.model";
import { RuleModel } from "./models/rule.model";

@Injectable()
export class RbacService {
  constructor(
    @InjectModel (UserModel) private userModel: typeof UserModel
  ) {}

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
