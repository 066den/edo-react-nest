import { SequelizeModule } from '@nestjs/sequelize';
import { Doc } from './../docs/docs.model';
import { Sender } from './senders.model';
import { Module } from '@nestjs/common';
import { SendersService } from './senders.service';
import { SendersController } from './senders.controller';

@Module({
  providers: [SendersService],
  controllers: [SendersController],
  imports:[
    SequelizeModule.forFeature([Sender, Doc]),
  ]
})
export class SendersModule {}
