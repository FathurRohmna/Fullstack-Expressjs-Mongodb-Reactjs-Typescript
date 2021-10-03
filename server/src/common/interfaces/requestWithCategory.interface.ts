import { Category } from './../../category/category.interface';
import { Request } from 'express';

export interface RequestWithCategory extends Request {
  categories: Category[]
}