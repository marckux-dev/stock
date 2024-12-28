
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  createdAt: Date;

  @Prop({})
  updatedAt?: Date;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category'
  })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
