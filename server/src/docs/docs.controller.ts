
import { DocsService } from './docs.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';

@Controller('docs')
export class DocsController {
  constructor(private docService: DocsService){}

  @Post()
  createDoc(@Body() dto: CreateDocDto) {
    return this.docService.create(dto)
  }
}
