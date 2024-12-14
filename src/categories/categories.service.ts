import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoriesService {

  private categories: Category[] = [];

  create(createCategoryDto: CreateCategoryDto) {
    const category: Category = {
      id: uuid(),
      ...createCategoryDto,
      createdAt: new Date(),
    };
    this.categories.push(category);
    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    this.findOne(id);
    const categoryIndex = this.categories.findIndex((category) => category.id === id);
    const updatedCategory = {
      ...this.categories[categoryIndex],
      ...updateCategoryDto,
      id,
      updatedAt: new Date(),
    }
    this.categories[categoryIndex] = updatedCategory;
    return updatedCategory;
  }

  remove(id: string) {
    const category = this.findOne(id);
    this.categories = this.categories.filter((category) => category.id !== id);
    return category;
  }
}
