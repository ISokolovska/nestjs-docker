import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  UseGuards,
  Request,
  HttpStatus,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { ApiOperation } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/role.enum';
import { JwtAuthGuard } from '../users/user.guard';
import { IServerResponse } from 'src/interfaces/server-responce';
import { RolesGuard } from '../users/roles/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all tasks' })
  async getAllTasks(@Request() req): Promise<IServerResponse<Task[]>> {
    const tasks = await this.taskService.getAllTasks(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: "User's task",
      data: tasks,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task with special ID' })
  async getCategoryById(@Param('id') id: number): Promise<Task> {
    const task = await this.taskService.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with id ${id} doesn't exist`);
    return task;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Add task' })
  async addTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.addTask(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update task' })
  async updateTaskById(
    @Param('id') id: number,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTaskById(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Delete task' })
  async removeTask(@Param('id') id: number): Promise<IServerResponse> {
    await this.taskService.removeTask(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Category with id ${id} was removed`,
    };
  }
}
