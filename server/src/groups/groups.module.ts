import { Group } from './groups.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [
    SequelizeModule.forFeature([Group])
  ]
})
export class GroupsModule {}
