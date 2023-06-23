import { Body, Controller, Get, Post } from '@nestjs/common'
import { User } from './interfaces/user.interface';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from './dto/create-user.dto'

@Controller()
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
  this.userService.create(createUserDto)
}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

}