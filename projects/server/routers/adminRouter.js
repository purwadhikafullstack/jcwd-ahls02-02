const { adminController } = require("../controllers");
const route = require("express").Router();

route.get("/sales", adminController.getSalesReports);
route.get("/stock", adminController.getStockReport);
route.get("/prescription", adminController.getPrescriptionList);
route.post("/order/prescription", adminController.addPrescriptionOrder);
route.patch("/payment", adminController.confirmPayment);

module.exports = route