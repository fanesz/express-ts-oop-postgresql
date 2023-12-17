import Database from '../../config/database';
import CategoryModel from './model';

class CategoryController extends Database {
  private table: string = 'categories';

  constructor() {
    super();
  }

  async getCategory(): Promise<CategoryModel[]> {
    const query = {
      text: `SELECT * FROM ${this.table}`,
    };
    const result: CategoryModel[] = (await this.query(query)).data.rows;
    return result;
  }

  async getCategoryById(id: number): Promise<CategoryModel[]> {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const result: CategoryModel[] = (await this.query(query)).data.rows;
    return result;
  }

  async createCategory(name: string, description: string): Promise<number> {
    const query = {
      text: `INSERT INTO ${this.table}(name, description) VALUES($1, $2) RETURNING id`,
      values: [name, description],
    };

    const result: number = (await this.query(query)).data.rows[0];
    return result;
  }

  async updateCategory(id: number, name: string, description: string): Promise<number> {
    const query = {
      text: `UPDATE ${this.table} SET name = $1, description = $2 WHERE id = $3`,
      values: [name, description, id],
    };

    const result: number = (await this.query(query)).data.rowCount || 0;
    return result;
  }

  async deleteCategory(id: number): Promise<number> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id],
    };

    const result: number = (await this.query(query)).data.rowCount || 0;
    return result;
  }

}

export default CategoryController;
