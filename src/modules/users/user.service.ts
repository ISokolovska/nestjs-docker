import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import {
  ILoginResponse,
  IUser,
  IUserPayload,
} from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<User> {
    try {
      const hash = await argon.hash(dto.password);

      const user: User = await this.userRepository.create({
        ...dto,
        role: dto.role ? dto.role : 'user',
        password: hash,
      });

      await this.userRepository.save(user);

      delete user.password;

      return user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }

  async loginUser(dto: LoginUserDto): Promise<ILoginResponse> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordOk = await argon.verify(user.password, dto.password);

    if (!passwordOk) {
      throw new UnauthorizedException('Password not valid');
    }

    // const { password, ...result } = user;

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    return { token };
  }

  async getProfile(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;

    return result;
  }
}
