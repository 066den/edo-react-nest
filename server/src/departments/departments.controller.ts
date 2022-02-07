import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepDto } from './dto/create-dep.dto';

@ApiTags('Відділи, підприємства')
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {} 
  
  @Post()
  create(@Body() dto: CreateDepDto) {
    return this.departmentsService.createDepartment(dto);
  }
}
