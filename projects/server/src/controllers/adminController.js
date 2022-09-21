const { dbQuery } = require("../config/database");

module.exports = {
  // get sales report by product, transaction, user
  getSalesReports: async (req, res, next) => {
    try {
      if (req.dataUser.role === "admin") {
        let filter = "";
        let sort = "";
        let salesReportData;
        const filterChecklist = ["start_date", "end_date"];

        for (const key in req.query) {
          filterChecklist.forEach((val) => {
            if (key == val) {
              if (key === "start_date") {
                filter += ` and ol.created_at >= '${req.query[key]}'`;
              } else if (key === "end_date") {
                filter += ` and ol.created_at <= '${req.query[key]}'`;
              }
            }
          });
        }

        const offSet =
          (req.query.page - 1) * req.query.limit
            ? ` offset ${(req.query.page - 1) * req.query.limit}`
            : ``;

        if (req.query.sort) {
          if (req.query.order) {
            sort += `order by ${req.query.sort} ${req.query.order} limit ${req.query.limit}${offSet}`;
          } else {
            sort += `order by ${req.query.sort} asc limit ${req.query.limit}${offSet}`;
          }
        }
        if (!sort) {
          sort = `order by ol.id desc limit ${req.query.limit}${offSet}`;
        }

        let allData = "";

        if (req.query.type === "Transaction") {
          salesReportData = await dbQuery(
            `SELECT u.name, ol.created_at, ol.invoice_number, ol.subtotal, ol.shipping_address 
            FROM order_list ol 
            JOIN users u ON u.id = ol.id_user 
            WHERE ol.status IN ('Completed','Processed','Sent') 
            ${filter} ${sort}`
          );

          allData = await dbQuery(
            `SELECT ol.id
            FROM order_list ol 
            JOIN users u ON u.id = ol.id_user 
            WHERE ol.status IN ('Completed','Processed','Sent') 
            ${filter}`
          );
        } else if (req.query.type === "Product") {
          salesReportData = await dbQuery(
            `SELECT oc.id_stock, oc.product_name, oc.unit, ol.created_at, oc.id_order, SUM(oc.quantity) as quantity, SUM(oc.selling_price * oc.quantity) as subtotal FROM order_list ol 
            JOIN order_content oc ON oc.id_order = ol.id 
            WHERE ol.status IN ('Completed','Processed','Sent') 
            ${filter} 
            GROUP BY 1,2,3,4,5
            ${sort}`
          );

          allData = await dbQuery(
            `SELECT oc.id_stock, SUM(oc.quantity) as quantity
            FROM order_list ol 
            JOIN order_content oc ON oc.id_order = ol.id 
            WHERE ol.status IN ('Completed','Processed','Sent') 
            ${filter}
            GROUP BY 1`
          );
        } else if (req.query.type === "User") {
          salesReportData =
            await dbQuery(`SELECT ol.id_user, u.name, ol.created_at, SUM(ol.subtotal) as subtotal
          FROM order_list ol
          JOIN users u ON u.id = ol.id_user
          WHERE status IN ('Completed','Processed','Sent') 
          ${filter} 
          GROUP BY 1,2,3
          ${sort}`);
        }

        const totalPage = Math.ceil(allData.length / req.query.limit);

        return res.status(200).send({
          success: true,
          message: "Sales report successfully fetched",
          data: salesReportData,
          totalPage,
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "You don't have permission to access this",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // get stock history
  getStockReport: async (req, res, next) => {
    try {
      if (req.dataUser.role === "admin") {
        let filter = "";
        let sort = "";
        const filterChecklist = ["product_id", "start_date", "end_date"];

        for (const key in req.query) {
          filterChecklist.forEach((val) => {
            if (key == val) {
              if (key === "product_id") {
                if (req.query[key]) {
                  if (filter) {
                    filter += ` and p.id = '${req.query[key]}'`;
                  } else {
                    filter += `where p.id = '${req.query[key]}'`;
                  }
                }
              } else if (key === "start_date") {
                if (filter) {
                  filter += ` and sh.created_at >= '${req.query[key]}'`;
                } else {
                  filter += `where sh.created_at >= '${req.query[key]}'`;
                }
              } else if (key === "end_date") {
                if (filter) {
                  filter += ` and sh.created_at <= '${req.query[key]}'`;
                } else {
                  filter += `where sh.created_at <= '${req.query[key]}'`;
                }
              }
            }
          });
        }

        const offSet =
          (req.query.page - 1) * req.query.limit
            ? ` offset ${(req.query.page - 1) * req.query.limit}`
            : ``;

        if (req.query.sort) {
          if (req.query.order) {
            sort += `order by ${req.query.sort} ${req.query.order} limit ${req.query.limit}${offSet}`;
          } else {
            sort += `order by ${req.query.sort} asc limit ${req.query.limit}${offSet}`;
          }
        }
        if (!sort) {
          sort = `order by id desc limit ${req.query.limit}${offSet}`;
        }

        const stockHistoryData = await dbQuery(
          `SELECT sh.id, sh.created_at, p.name, sh.quantity, s.unit, sh.type from stock_history sh JOIN stock s ON s.id = sh.id_stock JOIN products p ON s.id_product = p.id ${filter} ${sort}`
        );

        const allData = await dbQuery(
          `select sh.id from stock_history sh JOIN stock s ON s.id = sh.id_stock JOIN products p ON s.id_product = p.id ${filter}`
        );

        const totalPage = Math.ceil(allData.length / req.query.limit);

        return res.status(200).send({
          success: true,
          message: "Stock history report successfully fetched",
          data: stockHistoryData,
          totalPage,
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "You don't have permission to acces this",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  getOrderList: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        let filter = "";
        let sort = "";
        const filterChecklist = [
          "status",
          "invoice_number",
          "start_date",
          "end_date",
        ];
        for (const key in req.query) {
          filterChecklist.forEach((val) => {
            if (key == val) {
              if (key === "status") {
                if (req.query[key]) {
                  if (filter) {
                    filter += ` and ol.status = '${req.query[key]}'`;
                  } else {
                    filter += `where ol.status = '${req.query[key]}'`;
                  }
                }
              } else if (key === "invoice_number") {
                if (filter) {
                  filter += ` and ol.invoice_number like '%${req.query[key]}%'`;
                } else {
                  filter += `where ol.invoice_number like '%${req.query[key]}%'`;
                }
              } else if (key === "start_date") {
                if (filter) {
                  filter += ` and ol.created_at >= '${req.query[key]}'`;
                } else {
                  filter += `where ol.created_at >= '${req.query[key]}'`;
                }
              } else if (key === "end_date") {
                if (filter) {
                  filter += ` and ol.created_at <= '${req.query[key]}'`;
                } else {
                  filter += `where ol.created_at <= '${req.query[key]}'`;
                }
              }
            }
          });
        }

        if (!filter.includes("ol.status")) {
          if (filter) {
            filter +=
              " AND ol.status NOT IN ('Waiting for Prescription Validation', 'Cancelled Prescription')";
          } else {
            filter +=
              "WHERE ol.status NOT IN ('Waiting for Prescription Validation', 'Cancelled Prescription')";
          }
        }

        const offSet =
          (req.query.page - 1) * req.query.limit
            ? ` offset ${(req.query.page - 1) * req.query.limit}`
            : ``;

        if (req.query.sort) {
          if (req.query.order) {
            sort += `order by ${req.query.sort} ${req.query.order} limit ${req.query.limit}${offSet}`;
          } else {
            sort += `order by ${req.query.sort} asc limit ${req.query.limit}${offSet}`;
          }
        }
        if (!sort) {
          sort = `order by id desc limit ${req.query.limit}${offSet}`;
        }

        const orderList = await dbQuery(
          `select ol.id, u.name, ol.status, ol.shipping_address, ol.shipping_method, ol.invoice_number, ol.payment_slip_image, ol.subtotal, ol.shipping_cost, ol.created_at from order_list ol JOIN users u on u.id = ol.id_user ${filter} ${sort}`
        );

        const allData = await dbQuery(
          `select ol.id from order_list ol ${filter}`
        );
        const totalPage = Math.ceil(allData.length / req.query.limit);

        if (orderList.length) {
          let orderIds = "";
          orderList.forEach((value) => (orderIds += `${value.id}, `));
          orderIds = orderIds.substring(0, orderIds.length - 2);

          const orderContents = await dbQuery(
            `select id, id_order, id_stock, id_prescription_content, product_name, product_image, quantity, selling_price, unit from order_content where id_order IN (${orderIds})`
          );
          const prescriptionContents = await dbQuery(
            `SELECT * from prescription_content where id_order IN (${orderIds})`
          );

          const tempOrderList = orderList.map((val) => {
            return { ...val };
          });

          tempOrderList.forEach((orderListValue) => {
            let content = [];
            orderContents.forEach((orderContentValue) => {
              if (orderListValue.id === orderContentValue.id_order) {
                if (orderContentValue.id_prescription_content === null) {
                  content.push(orderContentValue);
                } else {
                  if (
                    content.length < 1 ||
                    !content[content.length - 1].hasOwnProperty(
                      "ingredients"
                    ) ||
                    content[content.length - 1].ingredients[0]
                      .id_prescription_content !==
                      orderContentValue.id_prescription_content
                  ) {
                    prescriptionContents.forEach((prescriptionContentValue) => {
                      if (
                        prescriptionContentValue.id ===
                        orderContentValue.id_prescription_content
                      ) {
                        content.push({
                          ...prescriptionContentValue,
                          ingredients: [orderContentValue],
                        });
                      }
                    });
                  } else {
                    content[content.length - 1].ingredients.push(
                      orderContentValue
                    );
                  }
                }
              }
            });
            orderListValue.content = content;
          });

          return res.status(200).send({
            success: true,
            message: "Order list successfully fetched",
            data: tempOrderList,
            totalPage,
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "No order found",
            data: [],
            totalPage: 0,
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          message: "Please login to continue",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // get prescription list to be handled
  getPrescriptionList: async (req, res, next) => {
    try {
      let { page, limit } = req.query;

      if (req.query.status) {
        if (
          req.query.status === "Cancelled" ||
          req.query.status === "Waiting for Prescription Validation"
        ) {
          let allData =
            await dbQuery(`Select p.id as id_prescription, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
            LEFT JOIN order_list o ON o.id = p.id_order where o.status = '${req.query.status}' order by p.updated_at desc`);

          let filterLimit = `limit ${limit * (page - 1)}, ${limit * page}`;

          let totalPage = Math.ceil(allData.length / limit);

          let prescriptionList =
            await dbQuery(`Select p.id as id_prescription, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
            LEFT JOIN order_list o ON o.id = p.id_order where o.status = '${req.query.status}' order by p.updated_at desc ${filterLimit}`);

          return res.status(200).send({
            success: true,
            message: "success",
            data: prescriptionList,
            totalPage,
          });
        } else {
          let filterStatus = ``;
          req.query.status.forEach((value, index) => {
            if (filterStatus) {
              filterStatus += ` or o.status = '${value}'`;
            } else {
              filterStatus += `o.status = '${value}'`;
            }
          });

          let allData =
            await dbQuery(`Select p.id as id_prescription, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
          LEFT JOIN order_list o ON o.id = p.id_order where ${filterStatus} order by p.updated_at desc`);

          let filterLimit = `limit ${limit * (page - 1)}, ${limit * page}`;

          let totalPage = Math.ceil(allData.length / limit);

          let prescriptionList =
            await dbQuery(`Select p.id as id_prescription, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
          LEFT JOIN order_list o ON o.id = p.id_order where ${filterStatus} order by p.updated_at desc ${filterLimit}`);

          return res.status(200).send({
            success: true,
            message: "success",
            data: prescriptionList,
            totalPage,
          });
        }
      } else {
        let allData =
          await dbQuery(`Select p.id as id_prescription, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
        LEFT JOIN order_list o ON o.id = p.id_order order by p.updated_at desc`);

        let filterLimit = `limit ${limit * (page - 1)}, ${limit * page}`;

        let totalPage = Math.ceil(allData.length / limit);

        let prescriptionList =
          await dbQuery(`Select p.id as id_prescription, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
        LEFT JOIN order_list o ON o.id = p.id_order order by p.updated_at desc ${filterLimit}`);

        return res.status(200).send({
          success: true,
          message: "success",
          data: prescriptionList,
          totalPage,
        });
      }
      // let prescriptionList =
      //   await dbQuery(`Select p.id as id_prescription, u.name, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p

      // LEFT JOIN order_list o ON o.id = p.id_order
      // LEFT JOIN users u ON u.id = p.id_user
      // order by p.updated_at desc`);

      // return res.status(200).send({
      //   success: true,
      //   message: "success",
      //   data: prescriptionList,
      // });
    } catch (error) {
      return next(error);
    }
  },
  // add user order from prescription
  addPrescriptionOrder: async (req, res, next) => {
    try {
      if (req.dataUser.id) {
        const {
          id_order,
          id_prescription,
          id_user,
          formStockGeneric,
          formStockPrescription,
          productData,
        } = req.body;

        let insertPrescriptionContentQuery = ``; // untuk tabel prescription_content
        let insertGenericOrderQuery = ``; // untuk tabel order content
        let insertPrescriptionOrder = [];
        let insertPrescriptionOrderQuery = ``; // untuk tabel order_content

        let updateStockHistoryQuery = ``;
        let updateStockPrescriptionHistoryQuery = ``;

        let updateStockQuery = ``;
        let updateStockPrescriptionQuery = ``;

        let prescriptionContentInsertIds;

        let total_selling_price = 0;

        // UPDATE OBAT RACIKAN / PRESCRIPTION
        if (formStockPrescription.length) {
          formStockPrescription.forEach((value, index) => {
            insertPrescriptionContentQuery += `(${id_order}, ${id_prescription}, '${value.prescriptionName}')`;
            if (index < formStockPrescription.length - 1) {
              insertPrescriptionContentQuery += `, `;
            }
          });

          // add prescription content jika ada racikan
          const addPrescriptionContent = await dbQuery(
            `INSERT INTO prescription_content (id_order, id_prescription, product_name) VALUES ${insertPrescriptionContentQuery}`
          );

          // let addPrescriptionContent = { affectedRows: 2 };
          if (addPrescriptionContent.affectedRows) {
            // get prescription id to be used for updating order_content
            prescriptionContentInsertIds = await dbQuery(
              `SELECT id FROM prescription_content ORDER BY id desc limit ${formStockPrescription.length};`
            );

            prescriptionContentInsertIds.reverse();

            formStockPrescription.forEach(async (value, index) => {
              let subtotal_selling_price = 0;
              let subtotal_buying_price = 0;
              value.ingredients.forEach((valueIngredient, indexIngredient) => {
                productData.forEach((valueProduct) => {
                  if (valueProduct.id === valueIngredient.id_product) {
                    if (valueIngredient.default_unit === "false") {
                      subtotal_selling_price +=
                        (valueProduct.selling_price /
                          valueProduct.unit_conversion) *
                        valueIngredient.quantity;

                      subtotal_buying_price +=
                        (valueProduct.buying_price /
                          valueProduct.unit_conversion) *
                        valueIngredient.quantity;
                    } else {
                      // Total price for default unit
                      subtotal_selling_price +=
                        valueProduct.selling_price * valueIngredient.quantity;
                      subtotal_buying_price +=
                        valueProduct.buying_price * valueIngredient.quantity;
                    }

                    insertPrescriptionOrderQuery += `(${id_order}, ${
                      valueIngredient.id_stock
                    }, ${prescriptionContentInsertIds[index].id}, '${
                      valueProduct.name
                    }', '${valueProduct.description}', '${
                      valueProduct.image
                    }', '${valueProduct.category_name}', ${
                      valueIngredient.quantity
                    }, ${
                      valueProduct.selling_price / valueProduct.unit_conversion
                    }, ${
                      valueProduct.buying_price / valueProduct.unit_conversion
                    }, '${valueIngredient.unit}' , ${
                      valueProduct.unit_conversion
                    })`;

                    valueProduct.stock.forEach((valueStock) => {
                      if (valueStock.idStock === valueIngredient.id_stock) {
                        if (index === 0 && indexIngredient === 0) {
                          updateStockPrescriptionQuery += ` SELECT ${
                            valueIngredient.id_stock
                          } as id, ${
                            valueStock.quantity - valueIngredient.quantity
                          } as new_quantity `;
                        } else {
                          updateStockPrescriptionQuery += `SELECT ${
                            valueIngredient.id_stock
                          }, ${
                            valueStock.quantity - valueIngredient.quantity
                          } `;
                        }
                      }
                    });
                  }
                });
                updateStockPrescriptionHistoryQuery += `(${
                  valueIngredient.id_stock
                }, ${valueIngredient.quantity * -1}, 'Sales')`;

                if (
                  index < formStockPrescription.length - 1 ||
                  indexIngredient < value.ingredients.length - 1
                ) {
                  insertPrescriptionOrderQuery += ", ";
                  updateStockPrescriptionHistoryQuery += ", ";
                  updateStockPrescriptionQuery += ` UNION ALL `;
                }
              });

              total_selling_price += subtotal_selling_price;
              // Update kolom subtotal pada prescription
              const updatePrescriptionContentSubtotal = await dbQuery(
                `UPDATE prescription_content SET subtotal_selling_price = ${subtotal_selling_price}, subtotal_buying_price = ${subtotal_buying_price} WHERE id = ${prescriptionContentInsertIds[index].id}`
              );
            });
          }

          // add order content
          const addOrderContent = await dbQuery(
            `INSERT INTO order_content (id_order, id_stock, id_prescription_content, product_name, product_description, product_image, product_category, quantity, selling_price, buying_price, unit, unit_conversion) VALUES ${insertPrescriptionOrderQuery}`
          );

          // update stock table
          const updateStockTable = await dbQuery(
            `UPDATE stock s JOIN (${updateStockPrescriptionQuery}) vals ON s.id = vals.id SET s.quantity = vals.new_quantity `
          );

          // update stock history
          const updateStockHistory = await dbQuery(
            `INSERT INTO stock_history (id_stock, quantity, type) VALUES ${updateStockPrescriptionHistoryQuery}`
          );
        }

        // UPDATE STOCK GENERIC
        if (formStockGeneric.length) {
          formStockGeneric.forEach((value, index) => {
            productData.forEach((valueProduct) => {
              if (valueProduct.id === value.id_product) {
                insertGenericOrderQuery += `(${id_order}, ${
                  value.id_stock
                }, ${null}, '${valueProduct.name}', '${
                  valueProduct.description
                }', '${valueProduct.image}', '${valueProduct.category_name}', ${
                  value.quantity
                }, ${valueProduct.selling_price}, ${
                  valueProduct.buying_price
                }, '${value.unit}' , ${valueProduct.unit_conversion} )`;

                valueProduct.stock.forEach((valueStock) => {
                  if (valueStock.idStock === value.id_stock) {
                    if (index === 0) {
                      updateStockQuery += `SELECT ${value.id_stock} as id, ${
                        valueStock.quantity - value.quantity
                      } as new_quantity`;
                    } else {
                      updateStockQuery += ` SELECT ${value.id_stock}, ${
                        valueStock.quantity - value.quantity
                      }`;
                    }
                  }
                });
                total_selling_price +=
                  valueProduct.buying_price * value.quantity;
              }
            });

            updateStockHistoryQuery += `(${value.id_stock}, ${
              value.quantity * -1
            }, 'Sales')`;

            if (index < formStockGeneric.length - 1) {
              insertGenericOrderQuery += ", ";
              updateStockHistoryQuery += ", ";
              updateStockQuery += ` UNION ALL `;
            }
          });

          // add order content
          const addOrderContent = await dbQuery(
            `INSERT INTO order_content (id_order, id_stock, id_prescription_content, product_name, product_description, product_image, product_category, quantity, selling_price, buying_price, unit, unit_conversion) VALUES ${insertGenericOrderQuery}`
          );

          // update stock table
          const updateStockTable = await dbQuery(
            `UPDATE stock s JOIN (${updateStockQuery}) vals ON s.id = vals.id SET s.quantity = vals.new_quantity `
          );

          // update stock history
          const updateStockHistory = await dbQuery(
            `INSERT INTO stock_history (id_stock, quantity, type) VALUES ${updateStockHistoryQuery}`
          );
        }

        // update status prescription table
        const updateStatusPrescription = await dbQuery(
          `UPDATE prescription SET processed_status=${true} WHERE id=${id_prescription}`
        );

        // update status order list
        const updateStatus = await dbQuery(
          `UPDATE order_list SET status = 'Waiting for Payment', subtotal = ${total_selling_price} WHERE id = ${id_order}`
        );

        return res.status(200).send({
          success: true,
          message: "Order created",
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "Please login to continue",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  // confirm user payment
  confirmPayment: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  getHighlightReport: async (req, res, next) => {
    try {
      if (req.dataUser.role === "admin") {
        let todaysProfit = await dbQuery(
          `select sum(subtotal) as profit from order_list where created_at >= CURDATE() && created_at < (CURDATE() + INTERVAL 1 DAY)`
        );
        let yesterdaysProfit = await dbQuery(
          `select sum(subtotal) as profit from order_list where created_at >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) && created_at < (DATE_SUB(CURDATE(), INTERVAL 1 DAY) + INTERVAL 1 DAY)`
        );
        let profitGrowth = 0;

        if (todaysProfit && yesterdaysProfit) {
          profitGrowth +=
            (todaysProfit[0].profit - yesterdaysProfit[0].profit) /
            yesterdaysProfit[0].profit;
        } else if (todaysProfit && !yesterdaysProfit) {
          profitGrowth += 1;
        } else if (!todaysProfit && yesterdaysProfit) {
          profitGrowth -= 1;
        }

        let todaysOrder = await dbQuery(
          `select count(invoice_number) as orders from order_list where created_at >= CURDATE() && created_at < (CURDATE() + INTERVAL 1 DAY) and status not in('cancelled', 'cancelled prescription')`
        );
        let yesterdaysOrder = await dbQuery(
          `select count(invoice_number) as orders from order_list where created_at >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) && created_at < (DATE_SUB(CURDATE(), INTERVAL 1 DAY) + INTERVAL 1 DAY) and status not in('cancelled', 'cancelled prescription')`
        );

        let orderGrowth = 0;

        if (todaysOrder[0] && yesterdaysOrder) {
          orderGrowth +=
            (todaysOrder[0].orders - yesterdaysOrder[0].orders) /
            yesterdaysOrder[0].orders;
        } else if (todaysOrder && !yesterdaysOrder) {
          orderGrowth += 1;
        } else if (!todaysOrder && yesterdaysOrder) {
          orderGrowth -= 1;
        }

        let awaitingConfirmation = await dbQuery(
          `select count(id) as orders from order_list where created_at >= CURDATE() && created_at < (CURDATE() + INTERVAL 1 DAY) and status='waiting for confirmation' or status='waiting for prescription validation'`
        );

        return res.status(200).send({
          success: true,
          message: "data successfully fetched",
          data: {
            todaysProfit: todaysProfit[0].profit,
            profitGrowth,
            todaysOrder: todaysOrder[0].orders,
            orderGrowth,
            awaitingConfirmation: awaitingConfirmation[0].orders,
          },
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User unauthorized",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  getDailyProfit: async (req, res, next) => {
    try {
      if (req.dataUser.role === "admin") {
        // let { start_date, end_date } = req.query
        let { range, month } = req.query;
        const d = new Date();
        var todayDate = String(d.getDate()).padStart(2, "0");
        var todayMonth = String(d.getMonth() + 1).padStart(2, "0");
        var todayYear = d.getFullYear();

        let data = [];

        if (range === "Now") {
          let sales = await dbQuery(
            `select DATE_FORMAT(created_at,'%Y-%m-%d') as date, sum(subtotal) as total_sales from order_list  where month(created_at)='${todayMonth}' group by DATE_FORMAT(created_at,'%Y-%m-%d')`
          );

          const sales_data = [];

          sales.forEach((value) => {
            sales_data[`${value.date}`] = value.total_sales;
          });

          let totalDay = 0;

          if (
            todayMonth === "04" ||
            todayMonth === "06" ||
            todayMonth === "09" ||
            todayMonth === "11"
          ) {
            totalDay += 30;
          } else if (todayMonth === "02") {
            totalDay += 28;
          } else {
            totalDay += 31;
          }

          for (let i = 0; i < totalDay; i++) {
            if (i < 9) {
              let tempDate = `2022-${todayMonth}-0${i + 1}`;
              let tempSales = 0;
              if (sales_data[`2022-${todayMonth}-0${i + 1}`]) {
                tempSales += sales_data[`2022-${todayMonth}-0${i + 1}`];
              }
              data.push({ date: tempDate, total_sales: tempSales });
            } else {
              let tempDate = `2022-${todayMonth}-${i + 1}`;
              let tempSales = 0;
              if (sales_data[`2022-${todayMonth}-${i + 1}`]) {
                tempSales += sales_data[`2022-${todayMonth}-${i + 1}`];
              }
              data.push({ date: tempDate, total_sales: tempSales });
            }
          }
        } else if (range === "7 Days") {
          let sales =
            await dbQuery(`select DATE_FORMAT(created_at,'%Y-%m-%d') as date, sum(subtotal) as total_sales from order_list
          where created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) and created_at <= CURDATE()
          group by DATE_FORMAT(created_at,'%Y-%m-%d')`);

          const sales_data = [];

          sales.forEach((value) => {
            sales_data[`${value.date}`] = value.total_sales;
          });

          if (parseInt(todayDate) > 7) {
            let startDate = parseInt(todayDate) - 7;

            for (let i = startDate; i < todayDate; i++) {
              if (i < 9) {
                let tempDate = `2022-${todayMonth}-0${i + 1}`;
                let tempSales = 0;
                if (sales_data[`2022-${todayMonth}-0${i + 1}`]) {
                  tempSales += sales_data[`2022-${todayMonth}-0${i + 1}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              } else {
                let tempDate = `2022-${todayMonth}-${i + 1}`;
                let tempSales = 0;
                if (sales_data[`2022-${todayMonth}-${i + 1}`]) {
                  tempSales += sales_data[`2022-${todayMonth}-${i + 1}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              }
            }
          } else {
          }
        } else if (range === "30 Days") {
          let sales =
            await dbQuery(`select DATE_FORMAT(created_at,'%Y-%m-%d') as date, sum(subtotal) as total_sales from order_list
          where created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) and created_at <= CURDATE()
          group by DATE_FORMAT(created_at,'%Y-%m-%d')`);

          const sales_data = [];

          sales.forEach((value) => {
            sales_data[`${value.date}`] = value.total_sales;
          });

          if (parseInt(todayDate) > 30) {
            let startDate = parseInt(todayDate) - 30;

            for (let i = startDate; i < todayDate; i++) {
              if (i < 10) {
                let tempDate = `2022-${todayMonth}-0${i}`;
                let tempSales = 0;
                if (sales_data[`2022-${todayMonth}-0${i}`]) {
                  tempSales += sales_data[`2022-${todayMonth}-0${i}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              } else {
                let tempDate = `2022-${todayMonth}-${i}`;
                let tempSales = 0;
                if (sales_data[`2022-${todayMonth}-${i}`]) {
                  tempSales += sales_data[`2022-${todayMonth}-${i}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              }
            }
          } else {
            let daysLeft = 30 - parseInt(todayDate);
            let totalDate = 0;
            let lastMonthDate = 0;

            if (
              todayMonth === "05" ||
              todayMonth === "07" ||
              todayMonth === "10"
            ) {
              totalDate += 30;
              lastMonthDate += 30 - daysLeft;
            } else if (todayMonth === "03") {
              totalDate += 28;
              lastMonthDate += 28 - daysLeft;
            } else {
              totalDate += 31;
              lastMonthDate += 31 - daysLeft;
            }

            for (let i = lastMonthDate; i < totalDate; i++) {
              let tempMonth = "";
              if (parseInt(todayMonth) - 1 < 10) {
                tempMonth = `0${parseInt(todayMonth) - 1}`;
              } else {
                tempMonth = `${parseInt(todayMonth) - 1}`;
              }
              if (i < 10) {
                let tempDate = `2022-${tempMonth}-0${i}`;
                let tempSales = 0;
                if (sales_data[`2022-${tempMonth}-0${i}`]) {
                  tempSales += sales_data[`2022-${tempMonth}-0${i}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              } else {
                let tempDate = `2022-${tempMonth}-${i}`;
                let tempSales = 0;
                if (sales_data[`2022-${tempMonth}-${i}`]) {
                  tempSales += sales_data[`2022-${tempMonth}-${i}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              }
            }

            for (let i = 0; i < todayDate; i++) {
              if (i < 9) {
                let tempDate = `2022-${todayMonth}-0${i + 1}`;
                let tempSales = 0;
                if (sales_data[`2022-${todayMonth}-0${i + 1}`]) {
                  tempSales += sales_data[`2022-${todayMonth}-0${i + 1}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              } else {
                let tempDate = `2022-${todayMonth}-${i + 1}`;
                let tempSales = 0;
                if (sales_data[`2022-${todayMonth}-${i + 1}`]) {
                  tempSales += sales_data[`2022-${todayMonth}-${i + 1}`];
                }
                data.push({ date: tempDate, total_sales: tempSales });
              }
            }
          }
        } else if (range === "Specific Month") {
          let sales = await dbQuery(
            `select DATE_FORMAT(created_at,'%Y-%m-%d') as date, sum(subtotal) as total_sales from order_list  where month(created_at)='${month}' group by DATE_FORMAT(created_at,'%Y-%m-%d')`
          );

          const sales_data = [];

          sales.forEach((value) => {
            sales_data[`${value.date}`] = value.total_sales;
          });

          let totalDay = 0;

          if (
            month === "04" ||
            month === "06" ||
            month === "09" ||
            month === "11"
          ) {
            totalDay += 30;
          } else if (month === "02") {
            totalDay += 28;
          } else {
            totalDay += 31;
          }

          for (let i = 0; i < totalDay; i++) {
            if (i < 9) {
              let tempDate = `2022-${month}-0${i + 1}`;
              let tempSales = 0;
              if (sales_data[`2022-${month}-0${i + 1}`]) {
                tempSales += sales_data[`2022-${month}-0${i + 1}`];
              }
              data.push({ date: tempDate, total_sales: tempSales });
            } else {
              let tempDate = `2022-${month}-${i + 1}`;
              let tempSales = 0;
              if (sales_data[`2022-${month}-${i + 1}`]) {
                tempSales += sales_data[`2022-${month}-${i + 1}`];
              }
              data.push({ date: tempDate, total_sales: tempSales });
            }
          }
        }
        // let sales = await dbQuery(`select DATE_FORMAT(created_at,'%Y-%m-%d') as date, sum(subtotal) as total_sales from order_list  where created_at >= '${start_date}' and created_at <= '${end_date}' group by DATE_FORMAT(created_at,'%Y-%m-%d')`)

        // const year = d.getFullYear();
        // const month = d.getMonth() + 1
        // const day = d.getDate();

        // const today = todayYear + '-' + todayMonth + '-' + todayDate;

        // let newData = []

        // const start_date_array = start_date.split("-")
        // const end_date_array = start_date.split("-")

        return res.status(200).send({
          success: true,
          message: "Data fetched successfully",
          data,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User unauthorized",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  getReportData: async (req, res, next) => {
    try {
      if (req.dataUser.role === "admin") {
        let { start_date, end_date } = req.query;

        let sales =
          await dbQuery(`select DATE_FORMAT(created_at,'%Y-%m-%d') as date, sum(subtotal) as total_sales from order_list
          where created_at >= '${start_date}' and created_at <= '${end_date}'
          group by DATE_FORMAT(created_at,'%Y-%m-%d')`);

        const start = new Date(start_date);
        const end = new Date(end_date);

        const numberOfDays = Math.abs((start - end) / (1000 * 60 * 60 * 24));

        const dates = [];

        for (let index = 0; index <= numberOfDays; index++) {
          let currentDate = new Date(start_date);
          currentDate = currentDate.setDate(currentDate.getDate() + index);
          currentDate = new Intl.DateTimeFormat("en-GB").format(currentDate);
          const [day, month, year] = currentDate.split("/");
          currentDate = `${year}-${month}-${day}`;

          dates.push(currentDate);
        }

        let data = dates.reduce((accumulator, currentDate) => {
          const selectedData = sales?.find(({ date }) => date === currentDate);

          if (selectedData) {
            accumulator.push(selectedData);
          } else {
            accumulator.push({ date: currentDate, total_sales: 0 });
          }

          return accumulator;
        }, []);

        return res.status(200).send({
          success: true,
          message: "Data fetched successfully",
          data,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "User unauthorized",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
};
