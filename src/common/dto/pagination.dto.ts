import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly offset?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly limit?: number;

}