const { adminController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require('../config/encription');

route.get("/sales", readToken, adminController.getSalesReports);
route.get("/stock", readToken, adminController.getStockReport);
route.get("/prescription", adminController.getPrescriptionList);
route.get("/order", readToken, adminController.getOrderList);
route.post("/order/prescription", readToken, adminController.addPrescriptionOrder);
route.patch("/payment", adminController.confirmPayment);
route.get("/highlight", readToken, adminController.getHighlightReport);
route.get("/dailyProfit", readToken, adminController.getDailyProfit);

module.exports = route