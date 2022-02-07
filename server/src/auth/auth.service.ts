import { FilesService } from './../files/files.service';
import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService,
              private filesService: FilesService){}
  
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async auth(name: string) {
    const user = await this.userService.getUserByName(name);
    return this.generateToken(user);
  }

  async registration( userDto: CreateUserDto, file: any) {
    const candidate = await this.userService.getUserByName(userDto.full_name);
    if (candidate) {
      throw new HttpException("Такой пользователь существует", HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 6);
    let fileName = '';
    if(file){
      fileName = await this.filesService.createImage(file);
    }
    
    const user = await this.userService.createUser({...userDto, avatar: fileName, password: hashPassword})
    return this.generateToken(user)
    
  }

  private async generateToken(user: User) {
    const payload = {id: user.id, full_name: user.full_name, role: user.role}
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar: user.avatar,
        post: user.post,
        department: user.department,
        role: user.role,
      },
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByName(userDto.full_name);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Невірний логін або пароль'})
  }

}
