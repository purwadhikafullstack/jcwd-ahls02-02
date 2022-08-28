const fs = require("fs");
const { dbConf, dbQuery } = require("../config/database");
const { hashPassword, createToken } = require("../config/encription");
const { uploader } = require("../config/uploader");

module.exports = {
  // get all products
  getAllProducts: async (req, res, next) => {
    try {
      let result = await dbQuery('Select * from products;')
      return res.status(200).send(result)
    } catch (error) {
      return next(error);
    }
  },
  // get product category list
  getCategories: async (req, res, next) => {
    try {
      let result = await dbQuery('Select * from category;')
      return res.status(200).send(result)
    } catch (error) {
      return next(error);
    }
  },
  // get products (with pagination, filter, sort, etc)
  getProducts: async (req, res, next) => {
    try {
      if (Object.keys(req.query).length == 0) {
        let result = await dbQuery('Select * from products;')
        return res.status(200).send(result)
      } else if (Object.keys(req.query).length > 0) {
        let filter = ''
        let limit = ''
        let sort = ''
        let totalPage = 0
        const filterChecklist = ['id', 'name', 'id_category', 'needs_receipt', 'min_price', 'max_price']

        for (const key in req.query) {
          filterChecklist.forEach(val => {
            if (key == val) {
              if (key === 'id' || key === 'id_category') {
                if (filter) {
                  filter += ` and ${key} = ${req.query[key]}`
                } else {
                  filter += `where ${key} = ${req.query[key]}`
                }
              } else if (key === 'needs_receipt') {
                if (filter) {
                  filter += ` and ${key} = '${req.query[key]}'`
                } else {
                  filter += `where ${key} = '${req.query[key]}'`
                }
              } else if (key === 'name') {
                if (filter) {
                  filter += ` and ${key} like '%${req.query[key]}%'`
                } else {
                  filter += `where ${key} like '%${req.query[key]}%'`
                }
              } else if (key === 'min_price') {
                if (filter) {
                  filter += ` and selling_price > ${req.query[key]}`
                } else {
                  filter += `where selling_price > ${req.query[key]}`
                }
              } else if (key === 'max_price') {
                if (filter) {
                  filter += ` and selling_price < ${req.query[key]}`
                } else {
                  filter += `where selling_price < ${req.query[key]}`
                }
              }
            }
          })
        }

        if (req.query.sort) {
          if (req.query.order) {
            sort += `order by ${req.query.sort} ${req.query.order}`
          } else {
            sort += `order by ${req.query.sort} asc`
          }
        }

        let allData = await dbQuery(`Select p.id, p.name, p.description, p.id_category, c.category_name, s.quantity, s.unit, s.default_unit, p.selling_price, p.unit_conversion, p.needs_receipt,  p.image, p.is_active from products p
        LEFT JOIN stock s ON s.id_product = p.id
        LEFT JOIN category c ON c.id = p.id_category ${filter} ${sort};`)

        let totalData = allData.length + 1

        if (req.query.limit) {
          if (req.query.page) {
            page = (req.query.page - 1) * req.query.limit
            limit += `limit ${page}, ${req.query.limit}`
          } else {
            limit += `limit 0, ${req.query.limit}`
          }
          totalPage += Math.ceil(totalData / req.query.limit)
        } else {
          if (req.query.page) {
            page = (req.query.page - 1) * 12
            limit += `limit ${page}, 12`
          } else {
            limit += `limit 0, 12`
          }
          totalPage += Math.ceil(totalData / 12)
        }

        let resultFilter = await dbQuery(`Select p.id, p.name, p.description, p.id_category, c.category_name, s.quantity, s.unit, s.default_unit, p.selling_price, p.unit_conversion, p.needs_receipt,  p.image, p.is_active from products p
        LEFT JOIN stock s ON s.id_product = p.id
        LEFT JOIN category c ON c.id = p.id_category ${filter} ${sort} ${limit};`)

        return res.status(200).send({ product: resultFilter, totalPage });
      }
    } catch (error) {
      return next(error);
    }
  },
  getDetailProduct: async (req, res, next) => {
    try {
      console.log(req.params)
    } catch (error) {
      return next(error);
    }
  },
  addCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  editCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  deleteCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // sekaligus add data di tabel stock
  addProduct: async (req, res, next) => {
    try {
      if (req.dataUser.role === 'admin') {
        const uploadFile = uploader("/imgProduct", "IMGPRODUCT").array("image", 1);
        uploadFile(req, res, async (error) => {
          try {
            const newFileName = req.files[0]
              ? `'/imgProduct/${req.files[0].filename}'`
              : null;

            let { name, id_category, description, needs_receipt, selling_price, buying_price, stock, unit_conversion } = JSON.parse(req.body.data);

            let newProduct = await dbQuery(
              `INSERT INTO products (name, description, image, id_category, selling_price, buying_price, unit_conversion, needs_receipt) VALUE ('${name}', '${description}', ${newFileName}, ${id_category}, ${selling_price}, ${buying_price}, ${unit_conversion}, '${needs_receipt}');`
            );

            if (newProduct.insertId) {
              let values = ''
              stock.forEach((val, id) => {
                if (!values) {
                  values += `(${newProduct.insertId}, '${val.unit}', '${val.default_unit}', ${val.quantity})`
                } else {
                  values += `, (${newProduct.insertId}, '${val.unit}', '${val.default_unit}', ${val.quantity})`
                }
              })

              await dbQuery(
                `INSERT INTO stock (id_product, unit, default_unit, quantity) VALUE ${values};`)

              return res.status(200).send({
                success: true,
                message: "Product successfully added!",
                // data: newProduct
              })

            } else {
              return res.status(401).send({
                success: true,
                message: "Failed to upload!",
                // data: newProduct
              })
            }

            // await dbQuery(
            //   `INSERT INTO category (name, description, image, id_category, selling_price, buying_price, unit_conversion, needs_receipt) VALUE (${name}, ${description}, ${newFileName}, ${id_category}, ${selling_price}, ${buying_price}, ${unit_conversion}, ${needs_receipt});`
            // );

            // if (postProduct) {
            //   const newUserData = await dbQuery(
            //     `select id, role, verified_status, name, email, phone_number, profile_picture, birthdate, gender from users where id = ${req.dataUser.id}`
            //   );

            //   const {
            //     id,
            //     role,
            //     verified_status,
            //     name,
            //     email,
            //     phone_number,
            //     profile_picture,
            //     birthdate,
            //     gender,
            //   } = newUserData[0];

            //   const newToken = createToken({
            //     id,
            //     role,
            //     name,
            //     email,
            //     phone_number,
            //   });

            // return res.status(200).send({
            //   success: true,
            //   message: "Product successfully added!",
            //   data: newProduct
            // });
            // }




          } catch (error) {
            return next(error);
          }
        });
      } else {
        return res.status(401).send({
          success: false,
          message: 'not authorized'
        })
      }
    } catch (error) {
      return next(error);
    }
  },
  editProduct: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // remove product from list => change product status to inactive
  deleteProduct: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // update product stock when there is sales / manual stock update / unit conversion 
  updateStock: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // check stock when admin wants to convert product unit during prescription process
  unitConversion: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
};
