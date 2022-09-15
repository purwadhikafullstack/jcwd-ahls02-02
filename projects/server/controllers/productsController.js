const fs = require("fs");
const { dbConf, dbQuery } = require("../config/database");
const { hashPassword, createToken } = require("../config/encription");
const { uploader } = require("../config/uploader");

module.exports = {
  // get all products
  getAllProducts: async (req, res, next) => {
    try {
      let result = await dbQuery('Select * from products;')
      let stock = await dbQuery('Select * from stock')

      result.forEach((valueProduct, indexProduct) => {
        let detailStock = []
        stock.forEach((valueStock) => {
          if (valueStock.id_product === valueProduct.id) {
            detailStock.push({ quantity: valueStock.quantity, unit: valueStock.unit, default_unit: valueStock.default_unit })
          }
        })
        console.log('detailStock', detailStock)
        valueProduct.stock = detailStock
      })

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
              if (key === 'id') {
                if (filter) {
                  filter += ` and p.${key} = ${req.query[key]}`
                } else {
                  filter += `where p.${key} = ${req.query[key]}`
                }
              } else if (key === 'id_category') {
                if (filter) {
                  filter += ` and c.id = ${req.query[key]}`
                } else {
                  filter += `where c.id = ${req.query[key]}`
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

        if (filter) {
          filter += ` and is_active='true'`
        } else {
          filter += `where is_active='true'`
        }

        let allData = await dbQuery(`Select p.id, p.name, p.description, p.id_category, c.category_name, s.quantity, s.unit, s.default_unit, p.selling_price, p.buying_price, p.unit_conversion, p.needs_receipt, p.image, s.id as id_stock, p.is_active from products p
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

        let resultFilter = await dbQuery(`Select p.id, p.name, p.description, p.id_category, c.category_name, s.quantity, s.unit, s.default_unit, p.selling_price, p.buying_price, p.unit_conversion, p.needs_receipt,  p.image, s.id as id_stock, p.is_active from products p
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
      if (req.params) {
        let productDetail = await dbQuery(`Select p.id, p.name, p.description, p.id_category, c.category_name, s.quantity, s.unit, s.default_unit, p.selling_price, p.buying_price, p.unit_conversion, p.needs_receipt, p.image, s.id as id_stock, p.is_active from products p
        LEFT JOIN stock s ON s.id_product = p.id
        LEFT JOIN category c ON c.id = p.id_category
        WHERE p.is_active = 'true' and s.default_unit='true' and p.id = ${req.params.product_id}`)

        let smallestUnit = await dbQuery(`Select unit from stock where id_product=${req.params.product_id} and default_unit = 'false'`)

        productDetail[0].smallest_unit = smallestUnit[0].unit

        if (productDetail[0]) {
          return res.status(200).send({
            success: true,
            message: `Successfully get data`,
            data: productDetail[0]
          })
        } else {
          return res.status(404).send({
            success: false,
            message: `Product doesn't exist`
          })
        }
      } else {
        return res.status(404).send({
          success: false,
          message: `Params doesn't exist`
        })
      }
    } catch (error) {
      return next(error);
    }
  },
  addCategories: async (req, res, next) => {
    try {
      if (req.dataUser.role === 'admin') {
        if (req.body.category_name) {
          let update = await dbQuery(`INSERT INTO category (category_name) VALUE ('${req.body.category_name}')`)
          if (update) {
            return res.status(200).send({
              success: true,
              message: 'Category successfully added'
            })
          } else {
            return res.status(401).send({
              success: false,
              message: 'Failed in adding category'
            })
          }
        }
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
  editCategories: async (req, res, next) => {
    try {
      if (req.dataUser.role === 'admin') {
        if (req.body.id) {
          let update = await dbQuery(`UPDATE category SET category_name = '${req.body.category_name}' WHERE id=${req.body.id}`)
          if (update) {
            return res.status(200).send({
              success: true,
              message: 'Category successfully updated'
            })
          } else {
            return res.status(401).send({
              success: false,
              message: 'category not found'
            })
          }
        }
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
  deleteCategories: async (req, res, next) => {
    try {
      if (req.dataUser.role === 'admin') {
        if (req.query.id) {
          let productCategory = await dbQuery(`Select * from products where id_category = ${req.query.id};`)
          if (productCategory.length > 0) {
            res.status(401).send({
              success: false,
              message: 'Category still contain products',
              data: productCategory
            })
          } else {
            let deleteCategory = await dbQuery(`Delete from category where id = ${req.query.id};`)
            if (deleteCategory) {
              return res.status(200).send({
                success: true,
                message: 'Category successfully updated'
              })
            } else {
              return res.status(401).send({
                success: false,
                message: 'Category not found'
              })
            }
          }
        }
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
                message: "Product successfully added!"
              })

            } else {
              return res.status(401).send({
                success: false,
                message: "Failed to upload!"
              })
            }
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
  editProductData: async (req, res, next) => {
    try {

      let newData = ''

      for (const key in req.body) {
        if (req.body[`${key}`] && key !== 'stock') {
          if (key === 'name' || key === 'description' || key === 'needs_receipt') {
            if (newData) {
              newData += `, ${key} = '${req.body[key]}'`
            } else {
              newData += `SET ${key} = '${req.body[key]}'`
            }
          } else {
            if (newData) {
              newData += `, ${key} = ${req.body[key]}`
            } else {
              newData += `SET ${key} = ${req.body[key]}`
            }
          }

        }
      }
      if (newData) {
        await dbQuery(`UPDATE products ${newData} WHERE id = ${req.query.id};`)
      }

      let productType = await dbQuery(`SELECT * FROM stock WHERE id_product = ${req.query.id}`)


      if (productType.length === 0) {
        let value = ''
        req.body.stock.forEach((val) => {
          if (val.quantity && val.unit && val.default_unit) {
            if (value) {
              value += `, (${req.query.id}, ${val.quantity}, '${val.unit}', '${val.default_unit}')`
            } else {
              value += `(${req.query.id}, ${val.quantity}, '${val.unit}', '${val.default_unit}')`
            }
          }
        })
        await dbQuery(`INSERT INTO stock (id_product, unit, default_unit, quantity) VALUE ${value}`)
      } else if (productType.length === 1) {
        let update = ``
        let add = ``
        req.body.stock.forEach(val => {
          if (val.default_unit === productType[0].default_unit) {
            if (val.quantity) {
              if (update) {
                update += `, quantity = ${val.quantity}`
              } else {
                update += `quantity = ${val.quantity}`
              }
            } else if (val.unit) {
              if (update) {
                update += `, unit = '${val.unit}'`
              } else {
                update += `unit = '${val.unit}'`
              }
            }
          } else {
            if (val.quantity && val.unit) {
              add += `(${req.query.id}, '${val.unit}', '${val.default_unit}', ${val.quantity})`
            }
          }
        })
        if (add) {
          await dbQuery(`INSERT INTO stock (id_product, unit, default_unit, quantity) VALUE ${add}`)
        }
        if (update) {
          await dbQuery(`UPDATE stock SET ${update} WHERE id = ${productType[0].id}`)
        }
      } else if (productType.length === 2) {
        let firstUpdate = ''
        let firstId = ''
        let firstQuantityChange = 0
        let secondUpdate = ''
        let secondId = ''
        let SecondQuantityChange = 0


        productType.forEach(val => {
          if (req.body.stock[0].default_unit === val.default_unit) {
            firstId = val.id
            if (req.body.stock[0].quantity) {
              firstQuantityChange += req.body.stock[0].quantity
              if (firstUpdate) {
                firstUpdate += `, quantity = ${req.body.stock[0].quantity}`
              } else {
                firstUpdate += `SET quantity = ${req.body.stock[0].quantity}`
              }
            }
            if (req.body.stock[0].unit) {
              if (firstUpdate) {
                firstUpdate += `, unit = '${req.body.stock[0].unit}'`
              } else {
                firstUpdate += `SET unit = '${req.body.stock[0].unit}'`
              }
            }
          }
        })

        productType.forEach(val => {
          if (req.body.stock[1].default_unit === val.default_unit) {
            secondId = val.id
            if (req.body.stock[1].quantity) {
              SecondQuantityChange += req.body.stock[1].quantity
              if (secondUpdate) {
                secondUpdate += `, quantity = ${req.body.stock[1].quantity}`
              } else {
                secondUpdate += `SET quantity = ${req.body.stock[1].quantity}`
              }
            }
            if (req.body.stock[1].unit) {
              if (secondUpdate) {
                secondUpdate += `, unit = '${req.body.stock[1].unit}'`
              } else {
                secondUpdate += `SET unit = '${req.body.stock[1].unit}'`
              }
            }
          }
        })


        if (firstUpdate) {
          let initialQuantity = await dbQuery(`SELECT quantity FROM stock where id = ${firstId};`)
          let finalChange = initialQuantity[0].quantity - firstQuantityChange
          console.log('initialQuantity', initialQuantity[0].quantity)
          console.log('firstQuantityChange', firstQuantityChange)
          console.log('finalChange', finalChange)
          await dbQuery(`INSERT INTO stock_history (id_stock, quantity, type) VALUE (${firstId}, ${finalChange}, 'Stock Update')`)
          await dbQuery(`UPDATE stock ${firstUpdate} WHERE id = ${firstId}`)
        }
        if (secondUpdate) {
          let initialQuantity = await dbQuery(`SELECT quantity FROM stock where id = ${secondId};`)
          let finalChange = initialQuantity[0].quantity - SecondQuantityChange
          console.log('finalChange', finalChange)
          await dbQuery(`INSERT INTO stock_history (id_stock, quantity, type) VALUE (${secondId}, ${finalChange}, 'Stock Update')`)
          await dbQuery(`UPDATE stock ${secondUpdate} WHERE id = ${secondId}`)
        }
      }

      return res.status(200).send({
        success: true,
        message: "Product successfully updated!"
      })


    } catch (error) {
      return next(error);
    }
  },
  editProductPicture: async (req, res, next) => {
    try {
      const uploadFile = uploader("/imgProduct", "IMGPRODUCT").array("image", 1);

      uploadFile(req, res, async (error) => {
        try {
          try {
            const currentPicture = await dbQuery(
              `select image from products where id=${req.query.id}`
            );
            if (currentPicture[0].image) {
              fs.unlinkSync(`./public/${currentPicture[0].image}`);
            }
          } catch (error) {
            return next(error);
          }

          const newFileName = req.files[0]
            ? `'/imgProduct/${req.files[0].filename}'`
            : null;

          await dbQuery(`UPDATE products SET image = ${newFileName} WHERE id = ${req.query.id};`)

          return res.status(200).send({
            success: true,
            message: "Product successfully updated!"
          })
        } catch (error) {
          return next(error)
        }
      })
    } catch (error) {
      return next(error);
    }
  },
  // remove product from list => change product status to inactive
  deleteProduct: async (req, res, next) => {
    try {
      if (req.dataUser.role === 'admin') {
        if (req.query.id) {
          await dbQuery(`UPDATE products SET is_active = 'false' WHERE id = ${req.query.id}`)
          return res.status(200).send({
            success: true,
            message: 'product successfully deleted'
          })
        } else {
          return res.status(401).send({
            success: false,
            message: 'query is missing'
          })
        }
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
