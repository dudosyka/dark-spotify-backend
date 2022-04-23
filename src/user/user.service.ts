import { Injectable, UploadedFile } from "@nestjs/common";
import { SongModel } from "../song/models/song.model";
import { UserModel } from "./models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt'
import { Includeable, WhereOptions } from "sequelize/types/model";
import { HttpValidationException } from "../http.validation.exception";
import { Service } from "../service";
import { HttpDoubleRecordException } from "../http.double.record.exception";

@Injectable()
export class UserService extends Service {
  constructor(@InjectModel (UserModel) private userModel: typeof UserModel) {
    super();
  }

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

  private async generatePassword(password): Promise<string> {
    return await (new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err)
        }
        bcrypt.hash(password, salt, (err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
      })
    }));
  }

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

  public async reg(user: { login: string, password: string }): Promise<UserModel> | never {
    let validate = null;
    if (!user.login.match(/^[a-zA-Z0-9_-]{5,}$/)) {
      validate = {}
      validate['login'] = 'failed validation'
    }
    if (validate) {
      throw new HttpValidationException(validate)
    }
    if (!await this.checkUnique(this.userModel, { login: user.login })) {
      throw new HttpDoubleRecordException(`User with login ${user.login} already exists`);
    }
    return await this.userModel.create({
      login: user.login,
      password: await this.generatePassword(user.password),
      image: "",
      listened_time: 0,
      refresh: ""
    })
  }

  public async uploadAvatar(userId: number, @UploadedFile() avatar: Express.Multer.File) {
    const user = await this.findOne({
      id: userId
    });
    user.image = avatar.filename;
    return (await user.save()).image;
  }

  public async getSongs(): Promise<SongModel[]> {
    const user = await this.userModel.findOne({
      where: {
        id: 3
      },
      include: [SongModel, { model: UserModel, as: 'children' }, { model: UserModel, as: "parent" }]
    });

    return user.songs;
  }
}
