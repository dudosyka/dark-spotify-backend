import { Injectable } from "@nestjs/common";
import { SongModel } from "../song/models/song.model";
import { UserModel } from "./models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt'
import { Includeable, WhereOptions } from "sequelize/types/model";

@Injectable()
export class UserService {
  constructor(@InjectModel (UserModel) private userModel: typeof UserModel) {}

  public async comparePassword(user: UserModel, password: string): Promise<boolean> {
    if (!user) {
      return false
    }
    return (new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, ok) => {
        if (err !== null && err !== undefined)
          reject(err)
        resolve(ok)
      })
    }))
  }

  // private async generatePassword(password): Promise<string> {
  //   return await (new Promise<string>((resolve, reject) => {
  //     bcrypt.genSalt(10, (err, salt) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       bcrypt.hash(password, salt, (err, res) => {
  //         if (err) {
  //           reject(err)
  //         }
  //         resolve(res)
  //       })
  //     })
  //   }));
  // }

  public async findOne(where: WhereOptions<any>, include: Includeable[] = []): Promise<UserModel> {
    return this.userModel.findOne({
      where,
      include
    })
  }
  
  public async updateRefresh(user: UserModel, iat: number): Promise<UserModel> {
    return await user.update({
      refresh: iat
    })
  }

  public async getSongs(): Promise<UserModel[]> {
    const user = await this.userModel.findOne({
      where: {
        id: 3
      },
      include: [SongModel, { model: UserModel, as: 'children' }, { model: UserModel, as: "parent" }]
    });

    return user.friends()
  }
}
