import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CategoriesService {

  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }


  async create(createCategoryDto: CreateCategoryDto) {

    try {
      return await this.categoryModel.create(createCategoryDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Category already exists in db: ${ JSON.stringify(error.keyValue) }`);
      }
      console.error(error);
      throw new InternalServerErrorException(`Can't create category with error code: ${error.code}. Check server log.`);
    }

  }

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit = this.defaultLimit } = paginationDto;
    return this.categoryModel.find().limit(limit).skip(offset);
  }

  async findOne(id: string) {

    let category: Category;

    try {
      if (isValidObjectId(id)) {
        category = await this.categoryModel.findById(id);
      } else {
        category = await this.categoryModel.findOne({ name: id });
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(`Can't find category with error code: ${error.code}.`);
    }

    if (!category) {
      throw new NotFoundException(`Category with id or name ${id} not found`);
    }

    return category;

  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {

    const category = await this.findOne(id);
    try{
      await category.updateOne(updateCategoryDto, {new: true});
      return {...category.toJSON(), ...updateCategoryDto};
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Category ${updateCategoryDto.name} already exists in db`);
      } else {
        console.error(error);
        throw new InternalServerErrorException(`Can't update category with error code: ${error.code}.`);
      }
    }
  }

  async remove(id: string) {
    const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result)
      throw new NotFoundException(`Category with id ${id} not found`);
    return result;
  }

  async removeAll() {
    try{
      await this.categoryModel.deleteMany({});
      return {message: `All categories removed successfully.`};
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't delete category with error code: ${error.code}.`);
    }
  }

  async insertMany(list: CreateCategoryDto[]) {
    try{
      await this.categoryModel.insertMany(list);
      return {message: `Categories inserted successfully.`};
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't insert many categories with error code: ${error.code}.`);
    }
  }

}
