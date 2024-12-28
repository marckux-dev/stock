import { Controller, Post, Delete } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  populate() {
    return this.seederService.populate();
  }

  @Delete()
  reset() {
    return this.seederService.reset();
  }
}
