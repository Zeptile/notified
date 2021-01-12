
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  notes: Note[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

export interface Note {
    id: number;
    title: string;
    pageNumber: number;
    article?: string;
    note: string;
}