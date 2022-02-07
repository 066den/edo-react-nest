import { UserDoc } from './../docs/users-docs.model';
import { Doc } from './../docs/docs.model';
import { Role } from './../roles/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Department } from 'src/departments/departments.model';
import { DepartmentsModule } from 'src/departments/departments.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, Department, Doc, UserDoc]),
    RolesModule,
    DepartmentsModule,
    FilesModule,
    forwardRef(()=>AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
