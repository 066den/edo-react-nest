import { CustomField } from './custom-fields.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CustomFieldsController } from './custom-fields.controller';
import { CustomFieldsService } from './custom-fields.service';

@Module({
  controllers: [CustomFieldsController],
  providers: [CustomFieldsService],
  imports:[
    SequelizeModule.forFeature([CustomField])
  ],
})
export class CustomFieldsModule {}
