import { Doc } from './docs.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocDto } from './dto/create-doc.dto';

@Injectable()
export class DocsService {
  constructor(@InjectModel(Doc) private docRepository: typeof Doc){}

  async create(dto: CreateDocDto) {
    const doc = await this.docRepository.create(dto);
    return doc;
  }
}
