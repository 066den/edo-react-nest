import { Category } from './docs-category.model';
import { Sender } from './../senders/senders.model';
import { User } from './../users/users.model';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserDoc } from './users-docs.model';

interface DocCreationAttrs {
  title: string;
  description: string;
  resolution: string;
  number: string;
  files: string;
  userId: number;
  senderId: number;
}

@Table({tableName: 'docs'})
export class Doc extends Model<Doc, DocCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.DATE})
  date: string;
  
  @Column({type: DataType.STRING})
  number: string;
  
  @Column({type: DataType.STRING})
  title: string;

  @Column({type: DataType.STRING})
  description: string;

  @Column({type: DataType.JSON})
  resolution: object[];

  @Column({type: DataType.STRING})
  files: string;

  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  categoryId: number;

  @BelongsTo(()=>Category)
  category: Category

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(()=>User)
  author: User

  @ForeignKey(() => Sender)
  @Column({type: DataType.INTEGER})
  senderId: number;

  @BelongsTo(()=>Sender)
  sender: Sender

  @BelongsToMany(() => User, () => UserDoc)
    executor: User[];

}