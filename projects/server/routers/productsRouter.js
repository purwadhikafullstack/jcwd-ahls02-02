const { productsController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require('../config/encription');

route.get("/all", productsController.getAllProducts);
route.get("/", productsController.getProducts);
route.get("/categories", productsController.getCategories);
route.post("/", readToken, productsController.addProduct);
route.patch("/editData", readToken, productsController.editProductData);
route.patch("/editPicture", readToken, productsController.editProductPicture);
route.delete("/deleteProduct", readToken, productsController.deleteProduct);

route.post("/categories", readToken, productsController.addCategories);
route.patch("/categories", readToken, productsController.editCategories);
route.delete("/categories", readToken, productsController.deleteCategories);

route.get("/:product_id", productsController.getDetailProduct);
route.get("/similarProduct/:product_id", productsController.getSimilarProducts);

route.patch("/stock", productsController.updateStock);
route.patch("/conversion/:product_id", productsController.unitConversion);

module.exports = route