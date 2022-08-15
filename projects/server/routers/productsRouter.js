const { productsController } = require("../controllers");
const route = require("express").Router();

route.get("/all", productsController.getAllProducts);
route.get("/", productsController.getProducts);
route.get("/:product_id", productsController.getDetailProduct);
route.post("/", productsController.addProduct);

route.get("/categories", productsController.getCategories);
route.post("/categories", productsController.addCategories);
route.patch("/categories", productsController.editCategories);
route.delete("/categories", productsController.deleteCategories);

route.patch("/:product_id", productsController.editProduct);
route.patch("/:product_id", productsController.deleteProduct);

route.patch("/stock", productsController.updateStock);
route.patch("/conversion/:product_id", productsController.unitConversion);

module.exports = route