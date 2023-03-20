import { Category } from './category.interface';

export interface Product {
  category: Category;
  creationAt: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
}