import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { FetchAdapter } from '../common/adapters/fetch.adapter';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [SeederController],
  providers: [
    SeederService,
    {
      provide: 'HttpClient',
      useClass: FetchAdapter
    },
  ],
  imports: [
    CategoriesModule,
    ProductsModule
  ]
})
export class SeederModule {}
