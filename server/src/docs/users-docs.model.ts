import { User } from '../users/users.model';
import { Doc } from './docs.model';

import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({tableName: 'users_docs', createdAt:false, updatedAt: false})
export class UserDoc extends Model<UserDoc> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ForeignKey(() => Doc)
  @Column({type: DataType.INTEGER})
  docId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

    
}