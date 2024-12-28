import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Category } from '../categories/entities/category.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createProductDto: CreateProductDto) {
    // Validate that the category exists
    const { category } = createProductDto;
    if (!(await this.categoryModel.findById(category))) {
      throw new NotFoundException(`Category with id ${category} not found`);
    }
    try {
      const product = await this.productModel.create(createProductDto);
      return await product.populate('category');
    } catch (error){
      if (error.code === 11000) {
        throw new BadRequestException(`A product with name ${createProductDto.name} already exists`);
      } else {
        console.log(error);
        throw new InternalServerErrorException(`Error with code ${error.code}. See log`);
      }
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit = this.defaultLimit } = paginationDto;
    return this.productModel.find().populate('category').limit(limit).skip(offset);
  }

  async findOne(id: string) {

    let product: Product;

    try {
      if (isValidObjectId(id)) {
        product = await this.productModel.findById(id);
      } else {
        product = await this.productModel.findOne({ name: id });
      }

    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(`Can't find product with error code: ${error.code}`);
    }

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return await product.populate('category');

  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    try {
      await product.updateOne(updateProductDto, {new: true});
      return   {...product.toJSON(), ...updateProductDto};

    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(`Product already exists in db`);
      } else {
        console.error(error);
        throw new InternalServerErrorException(`Can't update product with error code: ${error.code}. See log`);
      }
    }

  }

  async remove(id: string ) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product.populate('category');
  }

  async removeAll() {
    try {
      await this.productModel.deleteMany({});
      const message = 'All the products have been deleted.';
      return {message};
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't delete products. Error code: ${error.code}. See log`);
    }
  }

  async insertMany(list: CreateProductDto[]) {
    try {
      await this.productModel.insertMany(list);
      return {message: 'All the products have been inserted successfully.'};
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't insert products. Error code: ${error.code}. See log`);
    }
  }


}
