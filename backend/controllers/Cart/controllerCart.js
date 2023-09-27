const helpers = require("./helperCart");
const userHelpers = require("../User/helperUser");
const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");
const Cart = require("../../models/Cart");

module.exports = {
  createNewCart: async (req, res) => {
    const role = req.role; 
    return helpers.create(Cart, req, res, role);
  },
  updateById: async (req, res) => {
    const role = req.role; 
    return helpers.update(Cart, req, res, User);
  },
  getAll: async (req, res) => {
    const role = req.role;
    return userHelpers.getAll(Cart, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Cart, req, res, role);
  },
  deleteById: async (req, res) => {
    const role = req.role;
    return userHelpers.deleteById(Cart, req, res, role);
  },
};
