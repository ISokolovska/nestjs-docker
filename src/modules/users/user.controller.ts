import { Body, Controller, Get, Post } from '@nestjs/common';
import { ILoginResponse } from './interfaces/user.interface';

import { RegisterUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async registerUser(@Body() dto: RegisterUserDto): Promise<User> {
    const user = await this.userService.registerUser(dto);
    return user;
  }

  @Post('/signin')
  async loginUser(@Body() dto: LoginUserDto): Promise<ILoginResponse> {
    const response = await this.userService.loginUser(dto);

    return response;
  }
}
