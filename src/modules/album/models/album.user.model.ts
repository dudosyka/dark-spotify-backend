import { BaseModel } from '../../../utils/base.model';
import { Column, ForeignKey, Table } from 'sequelize-typescript';
import { UserModel } from '../../user/models/user.model';
import { AlbumModel } from './album.model';

@Table
export class AlbumUserModel extends BaseModel {
  @Column
  @ForeignKey(() => AlbumModel)
  album_id: number

  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  listen_count: number

  @Column
  liked: number
}
