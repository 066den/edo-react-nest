import { UsersModule } from './../users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=>UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    FilesModule
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
