import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsMongoId()
  readonly category: string;

  @IsOptional()
  readonly createdAt: Date = new Date();

}
