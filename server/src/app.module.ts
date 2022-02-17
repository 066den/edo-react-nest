import { Group } from './groups/groups.model';
import { CustomField } from './custom-fields/custom-fields.model';
import { UserDoc } from './docs/users-docs.model';
import { Category } from './docs/docs-category.model';
import { Sender } from './senders/senders.model';
import { Doc } from './docs/docs.model';
import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DepartmentsModule } from './departments/departments.module';
import * as path from 'path';
import { Department } from './departments/departments.model';
import { DocsModule } from './docs/docs.module';
import { SendersModule } from './senders/senders.module';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';
import { GroupsModule } from './groups/groups.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    MulterModule.register({
      dest: 'uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'uploads'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Department, Doc, Sender, Category, UserDoc, CustomField, Group],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    DocsModule,
    FilesModule,
    DepartmentsModule,
    SendersModule,
    CustomFieldsModule,
    GroupsModule,
  ],
})

export class AppModule {}