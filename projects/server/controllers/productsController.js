const fs = require("fs");

module.exports = {
  // get all products
  getAllProducts: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // get products (with pagination, filter, sort, etc)
  getProducts: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  getDetailProduct: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // get product category list
  getCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  addCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  editCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  deleteCategories: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // sekaligus add data di tabel stock
  addProduct: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  editProduct: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // remove product from list => change product status to inactive
  deleteProduct: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // update product stock when there is sales / manual stock update / unit conversion 
  updateStock: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
  // check stock when admin wants to convert product unit during prescription process
  unitConversion: async (req, res, next) => {
    try {
    } catch (error) {
      return next(error);
    }
  },
};
