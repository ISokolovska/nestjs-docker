import { Body, Controller, Get, Post } from '@nestjs/common'
import { Task } from './interfaces/task.interface';
import { TaskService } from 'src/tasks/task.service';
import { CreateTaskDto } from './dto/create-task.dto'

@Controller()
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
  this.taskService.create(createTaskDto)
}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks()
  }

}