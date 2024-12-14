import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(private categoriesService: CategoriesService) {
  }

  create(createProductDto: CreateProductDto) {
    const category: Category = this.categoriesService.findOne(createProductDto.category);
    const product: Product = {
      id: uuid(),
      ...createProductDto,
      category,
      createdAt: new Date(),
    }
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product: any = {
      ...this.findOne(id),
      ...updateProductDto,
    };

    if (updateProductDto.category) {
      product.category = this.categoriesService.findOne(updateProductDto.category);
    }

    const updatedProduct: Product = { ...product, id, updatedAt: new Date() };
    const productIndex = this.products.findIndex((product) => product.id === id);
    this.products[productIndex] = updatedProduct;
    return updatedProduct;

  }

  remove(id: string ) {
    const product = this.findOne(id);
    this.products = this.products.filter((product) => product.id !== id);
    return product;
  }
}
