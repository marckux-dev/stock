import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { SeederController } from './seeder.controller';

@Module({
  providers: [SeederService],
  imports: [CategoriesModule, ProductsModule],
  controllers: [SeederController]
})
export class SeederModule {}
