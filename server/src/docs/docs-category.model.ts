import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'doc_categories', createdAt:false, updatedAt: false})
export class Category extends Model<Category> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @Column({type: DataType.STRING})
  title: string;

  @Column({type: DataType.STRING})
  description: string;

}