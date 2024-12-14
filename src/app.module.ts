import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
