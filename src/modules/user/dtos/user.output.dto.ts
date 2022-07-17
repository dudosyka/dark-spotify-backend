import { UserModel } from "../models/user.model";
import { SongModel } from "../../song/models/song.model";
import { PlaylistModel } from "../../playlist/models/playlist.model";
import { RuleModel } from "../../rbac/models/rule.model";

export interface UserOutput {
  id?: number,
  login?: string,
  password?: string,
  image?: string,
  listened_time?: number,
  refresh?: string,
  closed?: boolean,
  status?: SongModel,
  songs?: SongModel[],
  playlists?: PlaylistModel[],
  friends?: UserModel[],
  rules?: RuleModel[]
}

export class UserOutputDto {
  constructor(private userModel: UserModel[]) {}

  public closed(): UserOutput[] {
    return this.userModel.map(el => ({
      id: el.id,
      login: el.login,
      password: null,
      image: el.image,
      listened_time: null,
      refresh: null,
      closed: true,
      status: null,
      songs: null,
      playlists: null,
      friends: null,
      rules: null
    }));
  }

  public open(): UserOutput[] {
    return this.userModel.map(el => ({
      id: el.id,
      login: el.login,
      password: null,
      image: el.image,
      listened_time: el.listened_time,
      refresh: null,
      closed: false,
      status: el.status,
      songs: el.songs,
      playlists: el.playlists,
      friends: el.friends,
      rules: el.rules
    }));
  }
}
