import { UserRoles } from './user-roles.model';
import { User } from './../users/users.model';
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({example: 'admin', description: 'Уникальное значение роли'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: 'Адміністратор', description: 'Описание'})
  @Column({type: DataType.STRING, allowNull: true})
  description: string;
  
}