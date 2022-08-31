const express = require("express");
const rajaOngkirController = require("../controllers/rajaOngkirController");
const route = express.Router();

route.get("/province", rajaOngkirController.getProvince);
route.get("/city/all", rajaOngkirController.getAllCity);
route.get("/city", rajaOngkirController.getCity);
route.get("/cost", rajaOngkirController.getCosts);

module.exports = route;