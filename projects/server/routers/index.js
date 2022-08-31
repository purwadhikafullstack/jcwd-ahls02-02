const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const adminRouter = require("./adminRouter");
const rajaOngkirRouter = require("./rajaOngkirRouter");

const router = require('express').Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/admin", adminRouter);
router.use("/rajaOngkir", rajaOngkirRouter);

module.exports = router