import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SeederModule } from './seeder/seeder.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    SeederModule,
    MongooseModule.forRoot('mongodb://localhost:27017/stock'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
