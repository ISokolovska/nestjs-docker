import { Body, Controller, Get, Post } from '@nestjs/common'
// import { Category } from './interfaces/category.interface';

import { CreateCategoryDto} from "./dto/create-category.dto"
import { CategoryService } from './category.service'

@Controller("categories")
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

//     @Post()
//     async create(@Body() createCategoryDto: CreateCategoryDto) {
//     this.categoryService.create(createCategoryDto)
// }
  
//     @Get()
//     async getAllCategories(): Promise<Category[]>  {
//         return this.categoryService.getAllCategories();
//     }
}