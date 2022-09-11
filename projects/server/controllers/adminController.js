const { dbQuery } = require("../config/database");

module.exports = {
  // get sales report by product, transaction, user
  getSalesReports: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // get stock history
  getStockReport: async (req, res, next) => {
    try {
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
              " AND ol.status NOT IN ('Waiting for Prescription Validation')";
          } else {
            filter +=
              "WHERE ol.status NOT IN ('Waiting for Prescription Validation')";
          }
        }

        const offSet =
          (req.query.page - 1) * req.query.limit
            ? `, ${(req.query.page - 1) * req.query.limit}`
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
            `select id, id_order, id_stock, product_name, product_image, quantity, selling_price, unit from order_content where id_order IN (${orderIds})`
          );

          orderList.forEach((orderListValue, index) => {
            let content = [];
            orderContents.forEach((orderContentValue) => {
              if (orderListValue.id === orderContentValue.id_order) {
                content.push({
                  id_content: orderContentValue.id,
                  id_stock: orderContentValue.id_stock,
                  product_name: orderContentValue.product_name,
                  image: orderContentValue.product_image,
                  quantity: orderContentValue.quantity,
                  selling_price: orderContentValue.selling_price,
                  unit: orderContentValue.unit,
                });
              }
            });
            orderListValue.content = content;
          });

          return res.status(200).send({
            success: true,
            message: "Order list successfully fetched",
            data: orderList,
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
      let prescriptionList = await dbQuery(`Select p.id as id_prescription, u.name, p.id_user, p.id_order, p.processed_status, p.prescription_image, o.invoice_number, o.shipping_address, o.shipping_method, p.updated_at, o.status from prescription p
      LEFT JOIN order_list o ON o.id = p.id_order 
      LEFT JOIN users u ON u.id = p.id_user
      order by p.updated_at desc`)

      return res.status(200).send({
        success: true,
        message: "success",
        data: prescriptionList
      });
    } catch (error) {
      return next(error);
    }
  },
  // add user order from prescription
  addPrescriptionOrder: async (req, res, next) => {
    try {
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
};
