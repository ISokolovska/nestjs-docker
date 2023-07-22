import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(categoryId: number): Promise<Task[]> {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('task.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id })
      .getOne();
  }

  async addTask(dto: CreateTaskDto): Promise<Task> {
    const category = this.taskRepository.create(dto);
    return await this.taskRepository.save(category);
  }

  async updateTaskById(id: number, dto: CreateTaskDto): Promise<Task> {
    try {
      const updatedData = await this.taskRepository
        .createQueryBuilder('task')
        .update<Task>(Task, { ...dto })
        .where('task.id = :id', { id: id })
        .returning('*') // returns all the column values
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} doesn't exist`);
    }
  }

  async removeTask(id: number): Promise<void> {
    try {
      const response = await this.taskRepository
        .createQueryBuilder('task')
        .delete()
        .where({
          id,
        })
        .execute();

      if (!response.affected) throw new NotFoundException();
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Task with id ${id} doesn't exist`);
    }
  }
}
