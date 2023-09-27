const helpers = require("./helperProduct");
const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");
const Product = require('../../models/Product');
const userHelpers = require('../User/helperUser')

const roleModelMap = {
  user: User,
  manager: Manager,
  admin: Admin,
};

module.exports = {
  addProduct: async (req, res) => {
    const role = req.role; 
    const Model = roleModelMap[role];
    return helpers.create(Product, req, res, role);
  },
  updateById: async (req, res) => {
    return helpers.updateById(Product, req, res);
  },
  deleteById: async (req, res) => {
    const role = req.role; 
    return userHelpers.deleteById(Product, req, res, role);
  },
  getAll: async (req, res) => {
    const role = req.role;
    return userHelpers.getAll(Product, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Product, req, res, role);
  },
  
};
