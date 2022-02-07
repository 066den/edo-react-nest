import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface DepCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'departments'})
export class Department extends Model<Department, DepCreationAttrs> {

  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({example: 'zag', description: 'Уникальное значение відділу'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: 'Адміністратор', description: 'Описание'})
  @Column({type: DataType.STRING, allowNull: false})
  description: string;
}