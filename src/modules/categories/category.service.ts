import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(userId: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.userId = :userId', { userId })
      .getMany();
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  async addCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  async removeCategory(id: number): Promise<void> {
    try {
      const response = await this.categoryRepository
        .createQueryBuilder('category')
        .delete()
        .where({
          id,
        })
        .execute();

      if (!response.affected) throw new NotFoundException();
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Category with id ${id} doesn't exist`);
    }
  }
}
