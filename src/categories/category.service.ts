import { Injectable } from '@nestjs/common'

import { Category } from './interfaces/category.interface'
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
    private readonly categories: Category[] = []

  create(category: Category) {
    this.categories.push(category)
  }

  getAllCategories(): Category[] {
    return this.categories
  }
}