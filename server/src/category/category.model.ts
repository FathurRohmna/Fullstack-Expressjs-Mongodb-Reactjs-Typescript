import mongoose, { Document, Schema } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  articles: string[]
}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    articles: [{                                                                                                                                                                        
      ref: 'Article',
      type: String
    }]
  },
)

export const Category = mongoose.model<CategoryDocument>('Category', CategorySchema)
