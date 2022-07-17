import { Injectable, UploadedFile } from "@nestjs/common";
import { SongModel } from "../../song/models/song.model";
import { UserModel } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt'
import { Includeable, WhereOptions } from "sequelize/types/model";
import { HttpValidationException } from "../../../exceptions/http.validation.exception";
import { HttpDoubleRecordException } from "../../../exceptions/http.double.record.exception";
import { BaseService } from "../../../utils/base.service";
import { UserDto } from "../dtos/user.dto";
import { UserSongModel } from "../models/user.song.model";
import { FriendModel } from "../models/friend.model";
import { MysqlExceptionService } from "../../../utils/mysql.exception.service";

@Injectable()
export class UserService extends BaseService<UserDto> {
  constructor(
    @InjectModel (UserModel) private userModel: typeof UserModel,
    @InjectModel(UserSongModel) private userSongModel: typeof UserSongModel,
    @InjectModel(FriendModel) private friendModel: typeof FriendModel,
    private errService: MysqlExceptionService
  ) {
    super("", "", userModel, null);
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

  private async hashPassword(password): Promise<string> {
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
    if (!await this.checkUnique({ where: { login: user.login } })) {
      throw new HttpDoubleRecordException(`User with login ${user.login} already exists`);
    }
    return await this.userModel.create({
      login: user.login,
      password: await this.hashPassword(user.password),
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
      include: [SongModel]
    });

    return user.songs;
  }

  public async likeSong(dto: any): Promise<void | UserSongModel> {
    return await this.userSongModel.create(dto).catch(err => {
      this.errService.throw(err)
    })
  }

  public async unlikeSong(user_id: number, song_id: number): Promise<boolean> {
    await this.userSongModel.destroy({
      where: {
        song_id,
        user_id
      }
    });
    return true;
  }

  public async getFriends(query: {}): Promise<UserModel[]> | never {
    return (await UserModel.get(query, true)).friends;
  }

  public async getFriendsRequests(query: {}): Promise<UserModel[]> | never {
    const model = await this.userModel.findOne({
      where: query,
      include: [{
        model: UserModel,
        as: 'friends',
        where: {
          "$friends->FriendModel.accepted$": 0,
        }
      }]
    })

    return model?.friends;
  }
}
