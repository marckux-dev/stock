import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';

@Module({

  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ]),
  ],
  exports: [
    CategoriesService,
    MongooseModule
  ],
})
export class CategoriesModule {}
