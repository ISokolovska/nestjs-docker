import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ILoginResponse } from './interfaces/user.interface';

import { RegisterUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './user.guard';
import { IServerResponse } from 'src/interfaces/server-responce';
import { ApiRequestTimeoutResponse } from '@nestjs/swagger';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async registerUser(@Body() dto: RegisterUserDto): Promise<User> {
    console.log(dto);
    try {
      const user = await this.userService.registerUser(dto);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/signin')
  async loginUser(
    @Body() dto: LoginUserDto,
  ): Promise<IServerResponse<ILoginResponse>> {
    const response = await this.userService.loginUser(dto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Logged in successfully',
      data: response,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req): Promise<IServerResponse<any>> {
    ApiRequestTimeoutResponse;
    return {
      statusCode: HttpStatus.OK,
      message: "User's categories",
      data: req.user,
    };
  }
}
