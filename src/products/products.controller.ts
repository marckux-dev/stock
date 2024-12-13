import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(
    private productsService: ProductsService
  ) {
  }


  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProductById( @Param('id', ParseUUIDPipe) id: string)  {
    return this.productsService.findOne(id);
  }

  @Post()
  createProduct(@Body() body:any){
    return {message: 'createProduct. Method not implemented', body};
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() body:any){
    return {message: `updateProduct id: ${id}. Method not implemented`, body};
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id:string){
    return {message: `deleteProduct id: ${id}. Method not implemented`};
  }

}
