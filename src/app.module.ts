import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [CategoriesModule, ProductsModule, SeederModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
