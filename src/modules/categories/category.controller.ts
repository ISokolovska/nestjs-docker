import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/role.enum';
import { Category } from './entities/category.entity';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users/user.guard';
import { IServerResponse } from 'src/interfaces/server-responce';
import { RolesGuard } from '../users/roles/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all categories' })
  async getAllCategories(@Request() req): Promise<IServerResponse<Category[]>> {
    const categories = await this.categoryService.getAllCategories(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: "User's categories",
      data: categories,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get category with special ID' })
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category)
      throw new NotFoundException(`Category with id ${id} doesn't exist`);
    return category;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Add category' })
  async addCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.addCategory(dto);
  }

  @Put('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Update category' })
  async updateCategoryById(
    @Param('id') id: number,
    @Body() dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryById(id, dto);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  @ApiOperation({ summary: 'Delete category' })
  async removeCategory(@Param('id') id: number): Promise<IServerResponse> {
    await this.categoryService.removeCategory(id);

    return {
      statusCode: HttpStatus.OK,
      message: `Category with id ${id} was removed`,
    };
  }
}
