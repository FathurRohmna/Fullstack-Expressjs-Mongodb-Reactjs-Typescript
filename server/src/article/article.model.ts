import mongoose, { Document, Schema } from 'mongoose';
import shortid from 'shortid'

export interface ArticleDocument extends Document {
  title: string;
  content: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  paid: boolean;
  image: string;
  categories: string[];
}

const ArticleSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: false },
    paid: { type: Boolean, required: true },
    categories: [{
      ref: 'Category',
      type: String
    }]
  },
)

export const Article = mongoose.model<ArticleDocument>('Article', ArticleSchema)
