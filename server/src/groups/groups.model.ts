import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GroupCreationAttrs {
  name: string;
}

@Table({tableName: 'groups', createdAt:false, updatedAt: false})
export class Group extends Model<Group, GroupCreationAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  name: string;


  
}