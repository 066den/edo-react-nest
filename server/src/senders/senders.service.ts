import { CreateSenderDto } from './dto/create-sender.dto';
import { Sender } from './senders.model';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SendersService {
  constructor(@InjectModel(Sender) private senderRepository: typeof Sender){}

  async create(dto: CreateSenderDto) {
    const {email} = dto;
    const candidate = await this.senderRepository.findOne({where:{email}})
    if (candidate) {
      throw new HttpException("Такий контрагент існує", HttpStatus.BAD_REQUEST)
    }
    const sender = await this.senderRepository.create(dto);
    return sender;
  }

  async getAllSenders() {
    const senders = await this.senderRepository.findAll({include: {all: true}})
    return senders;
  }

  async updateSender(id: string, dto: CreateSenderDto) {
     await this.senderRepository.update({...dto},{where:{id:id}});
  }

  async removeSender(id: string) {
    await this.senderRepository.destroy({where:{id:id}});
  }
  
}
