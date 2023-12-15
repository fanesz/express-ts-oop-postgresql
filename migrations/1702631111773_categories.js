/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('categories', {
    id: 'id',
    name: {
      type: 'varchar(50)',
      notNull: true
    },
    description: {
      type: 'varchar(255)',
      notNull: true
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
    INSERT INTO categories (name, description)
    VALUES
      ('Laptop', 'Laptop Asus ROG'),
      ('Mouse', 'Mouse Logitech'),
      ('Keyboard', 'Keyboard Logitech'),
      ('Headset', 'Headset Logitech'),
      ('Monitor', 'Monitor LG')
  `)

};

exports.down = pgm => {
  pgm.dropTable('categories');
};
