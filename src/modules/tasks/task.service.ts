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

  async getAllTasks(taskId: number): Promise<Task[]> {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('task.taskId = :taskId', { taskId })
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
