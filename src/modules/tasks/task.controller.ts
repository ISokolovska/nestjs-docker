import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { ApiOperation } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/role.enum';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all categories' })
  async getAllCategories(): Promise<Task[]> {
    const categories = await this.taskService.getAllTasks();
    if (categories.length === 0)
      throw new NotFoundException('There is no any record about categories');
    return categories;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category with special ID' })
  async getCategoryById(@Param('id') id: number): Promise<Task> {
    const category = await this.taskService.getTaskById(id);
    if (!category)
      throw new NotFoundException(`Task with id ${id} doesn't exist`);
    return category;
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Add category' })
  async addTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.addTask(dto);
  }

  //   @Delete(':id')
  //   @Roles(Role.Admin)
  //   @ApiOperation({ summary: 'Delete category' })
  //   async removeCategory(@Param('id') id: number): Promise<Category> {
  //     const category = await this.categoryService.getCategoryById(id);
  //     if (!category)
  //       throw new NotFoundException(`Category with id ${id} doesn't exist`);
  //     return this.categoryService.removeCategory(id, userId);
  //   }
}
