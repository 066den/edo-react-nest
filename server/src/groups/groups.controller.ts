import { AddGroupDto } from './dto/add-group.dto';
import { GroupsService } from './groups.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  addGroup(@Body() addDto: AddGroupDto){
    return this.groupsService.addGroup(addDto)
  }

  @Get()
  getAll(){
    return this.groupsService.getAll();
  }
}
