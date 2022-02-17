import { SendersService } from './senders.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSenderDto } from './dto/create-sender.dto';

@Controller('senders')
export class SendersController {
  constructor(private sendersService: SendersService) {}

  @Post()
  createSender(@Body() dto: CreateSenderDto) {
    return this.sendersService.create(dto)
  }

  @Get()
  getAll() {
    return this.sendersService.getAllSenders()
  }

  @Put(':id')
  updateSender(@Param('id') id: string, @Body() dto: CreateSenderDto) {
    return this.sendersService.updateSender(id, dto)
  }

  @Delete(':id')
  removeSender(@Param('id') id: string) {
    return this.sendersService.removeSender(id);
  }

}
