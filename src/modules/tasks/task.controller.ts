import { Body, Controller, Get, Post } from '@nestjs/common'
import { TaskInterface } from './interfaces/task.interface';

import { CreateTaskDto } from './dto/create-task.dto'
import { TaskService } from './task.service';

@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) { }

//   @Post()
//   async create(@Body() createTaskDto: CreateTaskDto) {
//   this.taskService.create(createTaskDto)
// }

//   @Get()
//   async getAllTasks(): Promise<Task[]> {
//     return this.taskService.getAllTasks()
  }

// }