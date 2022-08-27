const { productsController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require('../config/encription');

route.get("/all", productsController.getAllProducts);
route.get("/", productsController.getProducts);
route.get("/categories", productsController.getCategories);
route.post("/", readToken, productsController.addProduct);
route.patch("/editData", readToken, productsController.editProductData);
route.patch("/editPicture", readToken, productsController.editProductPicture);

route.post("/categories", productsController.addCategories);
route.patch("/categories", productsController.editCategories);
route.delete("/categories", productsController.deleteCategories);

route.get("/:product_id", productsController.getDetailProduct);
route.delete("/:product_id", productsController.deleteProduct);

route.patch("/stock", productsController.updateStock);
route.patch("/conversion/:product_id", productsController.unitConversion);

module.exports = route