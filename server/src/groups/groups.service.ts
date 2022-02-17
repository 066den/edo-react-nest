import { AddGroupDto } from './dto/add-group.dto';
import { Group } from './groups.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group){}

  async addGroup(addDto: AddGroupDto){
    const group = await this.groupRepository.create(addDto);
    return group;
  }

  async getAll() {
    const groups = await this.groupRepository.findAll();
    return groups;
  }
}
