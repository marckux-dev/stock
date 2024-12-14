import { Category } from '../../categories/entities/category.entity';

export class Product {

  id: string;
  name: string;
  category: Category;
  createdAt: Date;
  updatedAt?: Date;

}
