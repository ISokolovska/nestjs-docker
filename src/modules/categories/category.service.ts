import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
    constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
