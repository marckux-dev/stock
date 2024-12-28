import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {

  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsOptional()
  readonly createdAt: Date = new Date();

}

