import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ArtistModel } from "../../artist/models/artist.model";

@Table
export class SubscribeModel extends Model {
  @Column
  @ForeignKey(() => UserModel)
  user_id: number

  @Column
  @ForeignKey(() => ArtistModel)
  artist_id: number
}
