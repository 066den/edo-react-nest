import { Doc } from './../docs/docs.model';

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface SendCreationAttrs {
  title: string;
  email: string;
  description: string;
}

@Table({tableName: 'senders'})
export class Sender extends Model<Sender, SendCreationAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @HasMany(()=>Doc)
  docs: Doc[]

}