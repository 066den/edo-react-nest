import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  auth(@Req() req: any) {
    return this.authService.auth(req.user.full_name)
  }

  @Post('/registration')
  @UseInterceptors(
    FileInterceptor('avatar',{
      storage: diskStorage({
        destination: './dist/uploads/avatar',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }))
  registration(@Body() userDto: CreateUserDto, @UploadedFile() file) {
    return this.authService.registration(userDto, file)
  }

}
