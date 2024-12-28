
import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Category extends Document {

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  createdAt: Date;

  @Prop({})
  updatedAt?: Date;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
