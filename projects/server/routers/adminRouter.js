const { adminController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require('../config/encription');

route.get("/sales", adminController.getSalesReports);
route.get("/stock", adminController.getStockReport);
route.get("/prescription", adminController.getPrescriptionList);
route.get("/order", readToken, adminController.getOrderList);
route.post("/order/prescription", adminController.addPrescriptionOrder);
route.patch("/payment", adminController.confirmPayment);

module.exports = route