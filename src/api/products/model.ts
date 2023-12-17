import CategoryModel from "../categories/model";

export default interface ProductModel {
  id?: string;
  category_id?: CategoryModel['id'];
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}