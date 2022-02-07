import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './departments.model';
import { CreateDepDto } from './dto/create-dep.dto';

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Department) private depRepository: typeof Department) {}

  async createDepartment(dto: CreateDepDto) {
    const department = await this.depRepository.create(dto);
    return department;
  }

  async getDeps() {
    const roles = await this.depRepository.findAll();
    return roles;
  }
}
