import { Column, ForeignKey, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ArtistModel } from "../../artist/models/artist.model";
import { BaseModel } from "../../../utils/base.model";

@Table
export class SubscribeModel extends BaseModel {
  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  @ForeignKey(() => ArtistModel)
  artist_id: number
}
