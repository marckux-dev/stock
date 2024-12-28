import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(OmitType(CreateCategoryDto, ['createdAt' as const])) {

  @IsOptional()
  updatedAt?: Date = new Date();
}


