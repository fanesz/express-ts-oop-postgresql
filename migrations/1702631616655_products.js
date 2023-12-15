/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('products', {
    id: 'id',
    name: {
      type: 'varchar(50)',
      notNull: true,
    },
    category_id: {
      type: 'integer',
      notNull: true,
      references: 'categories',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    price: {
      type: 'integer',
      notNull: true,
    },
    stock: {
      type: 'integer',
      notNull: true,
    },
    description: {
      type: 'varchar(255)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.sql(`
    INSERT INTO products (name, category_id, price, stock, description)
    VALUES
      ('Laptop Asus ROG', 1, 20000000, 10, 'Laptop Asus ROG'),
      ('Mouse Logitech', 2, 200000, 10, 'Mouse Logitech'),
      ('Keyboard Logitech', 3, 200000, 10, 'Keyboard Logitech'),
      ('Headset Logitech', 4, 200000, 10, 'Headset Logitech'),
      ('Monitor LG', 5, 200000, 10, 'Monitor LG')
  `)
};

exports.down = pgm => {
  pgm.dropTable('products');
};
