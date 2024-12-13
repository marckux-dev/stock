import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: uuid(),
      name: 'product1',
      price: 100,
      description: 'This is product 1'
    },
    {
      id: uuid(),
      name: 'product2',
      price: 200,
      description: 'This is product 2'
    },
    {
      id: uuid(),
      name: 'product3',
      price: 300,
      description: 'This is product 3'
    }
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

}
