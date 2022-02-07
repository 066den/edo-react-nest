import { Doc } from './../docs/docs.model';

import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { Department } from 'src/departments/departments.model';
import { UserDoc } from 'src/docs/users-docs.model';

interface UserCreationAttrs {
  full_name: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ApiProperty({example: 'Мельников Д.О.', description: 'Полное имя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  full_name: string;

  @ApiProperty({example: 'user@mail.com', description: 'Почта'})
  @Column({type: DataType.STRING, allowNull: true})
  email: string;

  @ApiProperty({example: '123456', description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: 'avatar.png', description: 'Аватар'})
  @Column({type: DataType.STRING, allowNull: true})
  avatar: string;

  @ApiProperty({example: 'Начальник', description: 'Должность'})
  @Column({type: DataType.STRING, allowNull: true})
  post: string;

  @ForeignKey(() => Department)
  @Column({type: DataType.INTEGER, allowNull: true})
  departmentId: number;

  @BelongsTo(()=>Department)
  department: Department

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER, allowNull: true})
  roleId: number;

  @BelongsTo(()=>Role)
  role: Role;

  @HasMany(()=>Doc)
  create_docs: Doc[]

  @BelongsToMany(() => Doc, () => UserDoc)
  docs: Doc[];

}