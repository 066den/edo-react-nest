import { CreateUserDto } from './dto/create-user.dto';

import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary:'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary:'Обновить пользователя'})
  //@Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(@Param('id') id: string, @Body() userDto: CreateUserDto, @UploadedFile() file ){
    return this.usersService.updateUser(id, userDto, file)
  }

  @ApiOperation({summary:'Получить роли'})
  @ApiResponse({status: 200})
  //@Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary:'Получить роли, отделы'})
  @ApiResponse({status: 200})
  @UseGuards(RolesGuard)
  @Get('/settings')
  getDepRoles() {
    return this.usersService.getDepRoles()
  }

}
