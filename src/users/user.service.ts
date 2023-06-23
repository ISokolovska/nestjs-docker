import { Injectable } from '@nestjs/common'
import { User } from './interfaces/user.interface'
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    private readonly users: User[] = []

  create(user: User) {
    this.users.push(user)
  }

  getAllUsers(): User[] {
    return this.users
  }
}