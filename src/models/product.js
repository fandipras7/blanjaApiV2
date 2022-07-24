const pool = require('../config/db')

const modelsProduct = {
  select: (
    limit,
    offset,
    searchProduct,
    sortby,
    sort
  ) => {
    // 'SELECT products.*, category.name AS name_category FROM products JOIN category ON products.id_category = category.id LIMIT $1 OFFSET $2'
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line quotes
      let sql = `SELECT products.id, products.id_category, products.name, products.brand, products.size,
      products.color, products.photo, products.condition, products.description, products.stock,
      products.price 
      FROM products WHERE products.stock >= ${1}`

      console.log(searchProduct);
      if (searchProduct) {
        sql += ` AND products.name ILIKE '%${searchProduct}%'`
      }

      if (sortby) {
        sql += ` ORDER BY products.${sortby}`
      }

      if (sort) {
        sql += ` ${sort}`
      }

      sql += ` Limit ${limit} OFFSET ${offset}`

      console.log(sql);
      pool.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  selectById: (id) => {
    return pool.query('SELECT products.*, category.name AS name_category FROM products JOIN category ON products.id_category = category.id WHERE products.id = $1', [id])
  },
  insert: ({ name, brand, size, color, condition, stock, price, idCategory, photo, description }) => {
    return pool.query('INSERT INTO products(name, brand, size, color, condition, stock, price, id_category, photo, description)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name, brand, size, color, condition, stock, price, idCategory, photo, description])
  },
  update: ({ name, brand, size, color, condition, description, stock, price, idCategory, photo, id }) => {
    return pool.query(`UPDATE products SET 
    name = COALESCE($1, name), brand = COALESCE($2, brand), size = COALESCE($3, size), color = COALESCE($4, color),
    condition = COALESCE($5, condition), description = COALESCE($6, description), stock = COALESCE($7, stock),
    price = COALESCE($8, price), id_category = COALESCE($9, id_category),
    photo = COALESCE($10, photo) WHERE id = $11`,
    [name, brand, size, color, condition, description, stock, price, idCategory, photo, id])
  },
  delete: (id) => {
    return pool.query('DELETE FROM products WHERE id = $1', [id])
  },
  countProduct: (
    searchProduct,
    sortby,
    sort
  ) => {
    // return pool.query('SELECT COUNT(*) AS total from products')
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total from products WHERE products.stock >= ${1}`

      if (searchProduct) {
        sql += ` AND products.name = '${searchProduct}'`
      }

      // if (sortby) {
      //   // eslint-disable-next-line quotes
      //   sql += ` ORDER BY products.${sortby}`
      // }

      // if (sort) {
      //   sql += ` ${sort}`
      // }

      pool.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  search: (key, limit, offset) => {
    return pool.query('SELECT * FROM products WHERE name ILIKE $1 LIMIT $2 OFFSET $3', [`%${key}%`, limit, offset])
  },
  sort: (sortby, sort, limit, offset) => {
    return pool.query(`SELECT products.*, category.name FROM products JOIN category ON products.id_category = category.id ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset])
  }
}

module.exports = modelsProduct
