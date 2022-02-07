import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomField } from './custom-fields.model';
import { CreateFieldDto } from './dto/create-field.dto';

@Injectable()
export class CustomFieldsService {
  constructor(@InjectModel(CustomField) private fieldRepository: typeof CustomField){}

  async create(dto: CreateFieldDto){
    const check = await this.getFieldByName(dto.name);
    if(check) {
      throw new HttpException("Такое поле существует", HttpStatus.BAD_REQUEST)
    }
    const field = await this.fieldRepository.create(dto);
    return field;
  }

  async updateField(name: string, dto: CreateFieldDto) {
    await this.fieldRepository.update({value:dto}, {where:{name:name}});
    
  }

  async getFieldByName(name: string) {
    const field = await this.fieldRepository.findOne({where:{name}})
    return field;
  }
}
