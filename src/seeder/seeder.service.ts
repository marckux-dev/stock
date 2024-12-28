import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpClient } from '../common/interfaces/http-client.interface';
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';


@Injectable()
export class SeederService {

  constructor(
    @Inject('HttpClient')
    private readonly httpClient: HttpClient,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,

  ) {}

  async populate() {
    const urlCategories = 'https://dummyjson.com/products/category-list';
    const urlProducts = 'https://dummyjson.com/products?limit=200';
    try{
      const dataCategories = await this.httpClient.get<string[]>(urlCategories);
      const categories: CreateCategoryDto[] = dataCategories.map(name => ({name, createdAt: new Date()}));
      await this.reset();
      await this.categoriesService.insertMany(categories);
      const categoriesDb = await this.categoriesService.findAll({limit: 100, offset: 0});
      const categoriesMap = categoriesDb.reduce((acc, category) => {
        acc[category.name] = category._id;
        return acc;
      }, {});
      const {products} = await this.httpClient.get<any>(urlProducts);
      const productsToInsert: CreateProductDto[] = products.map((product: any) => {
        return {
          name: `${product.title} ${product.brand}`,
          category: categoriesMap[product.category],
          createdAt: new Date(),
        };
      });
      await this.productsService.insertMany(productsToInsert);
      return {message: `Database seeded successfully.`};
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Cannot populate the database: ${error.message}`);
    }

  }

  async reset() {
    await this.productsService.removeAll();
    await this.categoriesService.removeAll();

  }
}
