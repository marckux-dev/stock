import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';
import { categoriesSample, productsSample } from './sample-data';

@Injectable()
export class SeederService {

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService
  ) {}

  populate() {
    this.productsService.clear();
    this.categoriesService.clear();
    this.categoriesService.populate(categoriesSample);
    this.productsService.populate(productsSample);

  }

}
