const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv/config");

axios.defaults.baseURL = process.env.RAJA_ONGKIR_BASE_URL;
axios.defaults.headers.common["key"] = process.env.RAJA_ONGKIR_KEY;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

module.exports = {
  getProvince: async (req, res) => {
    try {
      const response = await axios.get("/province");
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  getAllCity: async (req, res) => {
    const response = await axios.get("/city?province=1&id=17");
    res.json(response.data);
  },

  getCity: async (req, res) => {
    const reqQuery = req.query
    let query = ''
    if (reqQuery) {
      for(let key in reqQuery) {
        query+=`${key}=${reqQuery[key]}`
      }
    }
    const response = await axios.get(`/city?${query}`);
    res.json(response.data);
  },

  getCosts: async (req, res) => {
    const { origin, destination, weight, courier } = req.body;
    const response = await axios.post("/cost", {
      origin,
      destination,
      weight,
      courier,
    });
    res.json(response.data);
  },
};
