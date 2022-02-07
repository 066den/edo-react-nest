import { CustomFieldsService } from './custom-fields.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';

@Controller('custom-fields')
export class CustomFieldsController {
  constructor(private fieldsService: CustomFieldsService){}

  @Post()
  createField(@Body() dto: CreateFieldDto) {
    return this.fieldsService.create(dto)
  }

  @Put(':name')
  updateField(@Param('name') name: string, @Body() dto: CreateFieldDto){
    return this.fieldsService.updateField(name, dto)
  }

  @Get(':name')
  getFields(@Param('name') name: string){
    return this.fieldsService.getFieldByName(name)
  }

}
