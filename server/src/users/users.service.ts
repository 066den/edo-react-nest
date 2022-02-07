import { DepartmentsService } from './../departments/departments.service';
import { AddRoleDto } from './dto/add-role.dto';
import { User } from './users.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs'
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
            private roleService: RolesService, 
            private departmentsService: DepartmentsService,
            private filesService: FilesService)  {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    //const role = await this.roleService.getRoleByValue(dto.role)
    //await user.$set('role', role.id)
    return user;
  }

  async updateUser(id: string, userDto: CreateUserDto, file: any) {
    let fileName = '';
    if(file){
      fileName = await this.filesService.createImage(file);
    }
    await this.userRepository.update({...userDto, avatar: fileName},{where:{id:id}});
    
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true},attributes:{exclude:['password']}}); //{include: {all: true}}
    return users;
  }

  async getUserByName(full_name: string) {
    const user = await this.userRepository.findOne({where:{full_name}, include: {all: true}})
    return user;
  }

  async getUserData(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where:{id}, include: {all: true}})
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if(role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async getDepRoles() {
    const roles = await this.roleService.getRoles();
    const deps = await this.departmentsService.getDeps();
    return {roles, deps};
  }
}
