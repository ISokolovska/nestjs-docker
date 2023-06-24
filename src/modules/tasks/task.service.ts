import { Injectable } from '@nestjs/common'
import { Task } from './entities/task.entity'

// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
    private readonly tasks: Task[] = []

  create(task: Task) {
    this.tasks.push(task)
  }

  getAllTasks(): Task[] {
    return this.tasks
  }
}