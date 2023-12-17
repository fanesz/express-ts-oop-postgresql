import Database from '../../config/database';
import ProductModel from './model';

class ProductController extends Database {
  private table: string = 'products';

  constructor() {
    super();
  }

  async getProduct(): Promise<ProductModel[]> {
    const query = {
      text: `SELECT * FROM ${this.table}`,
    };
    const result: ProductModel[] = (await this.query(query)).data.rows;
    return result;
  }

  async getProductById(id: number): Promise<ProductModel[]> {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE id = $1;`,
      values: [id],
    };

    const result: ProductModel[] = (await this.query(query)).data.rows;
    return result;
  }

  async createProduct(d: ProductModel): Promise<number> {
    const query = {
      text: `INSERT INTO ${this.table} VALUES(default, $1, $2, $3, $4, $5) RETURNING id;`,
      values: [d.name, d.category_id, d.price, d.stock, d.description],
    };

    const result: number = (await this.query(query)).data.rows[0];
    return result;
  }

  async updateProduct(id: number, d: ProductModel): Promise<number> {
    const query = {
      text: `UPDATE ${this.table} SET name=$2, category_id=$3, price=$4, stock=$5, description=$6 WHERE id = $1;`,
      values: [id, d.name, d.category_id, d.price, d.stock, d.description],
    };

    const result: number = (await this.query(query)).data.rowCount || 0;
    return result;
  }


  async deleteProduct(id: number): Promise<number> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const result: number = (await this.query(query)).data.rowCount || 0;
    return result;
  }
}

export default ProductController;