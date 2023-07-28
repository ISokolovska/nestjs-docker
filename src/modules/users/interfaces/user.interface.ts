import { Category } from 'src/modules/categories/entities/category.entity';

export interface IUserPayload {
  userId: number;
  email: string;
  role: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  role: string;
  categories: Category[];
}
