import { Group } from './../groups/groups.model';
import { Doc } from './../docs/docs.model';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";


interface SendCreationAttrs {
  name: string;
  email: string;
  description: string;
}

@Table({tableName: 'senders'})
export class Sender extends Model<Sender, SendCreationAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @HasMany(()=>Doc)
  docs: Doc[]

  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER})
  groupId: number;

  @BelongsTo(()=>Group)
  group: Group

}