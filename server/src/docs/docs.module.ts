import { UserDoc } from './users-docs.model';
import { Category } from './docs-category.model';
import { Sender } from './../senders/senders.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doc } from './docs.model';
import { User } from './../users/users.model';
import { DocsController } from './docs.controller';
import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';

@Module({
  providers: [DocsService],
  controllers: [DocsController],
  imports:[
    SequelizeModule.forFeature([User, Doc, Sender, Category, UserDoc]),
  ]
})
export class DocsModule {}
