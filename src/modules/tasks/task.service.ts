import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly categoryRepository: Repository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.categoryRepository.find();
  }

  getTaskById(id: number): Promise<Task> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  addTask(dto: CreateTaskDto): Promise<Task> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  // async removeCategory(id: number, userId: number): Promise<Category> {
  //   await this.categoryRepository
  //     .createQueryBuilder()
  //     // .where('category.id = :id', { id })
  //     // .getOne()
  //     .relation(User, 'category')
  //     .of(userId)
  //     .remove(id);
  // }
}
