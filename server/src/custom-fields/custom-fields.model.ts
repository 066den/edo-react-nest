import { Column, DataType, Model, Table } from "sequelize-typescript";

interface FieldCreationAttrs {
  name: string;
  value: object;
  description: string;
}

@Table({tableName: 'custom_fields', createdAt:false, updatedAt: false})
export class CustomField extends Model<CustomField, FieldCreationAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  name: string;

  @Column({type: DataType.JSON, allowNull: true})
  value: object;

  @Column({type: DataType.STRING, allowNull: true})
  description: string;


}