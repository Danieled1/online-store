const userHelpers = require('../User/helperUser')
const helpers = require("./helperOrder");
const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");
const Order = require("../../models/Order"); 

const roleModelMap = {
  user: User,
  manager: Manager,
  admin: Admin,
};

module.exports = {
  addOrder: async (req, res) => {
    const role = req.role; // Role is set by the middleware
    return helpers.create(Order, req, res, User); // Use the addOrder helper method here
  },
  updateById: async (req, res) => {
    const role = req.role; // Role is set by the middleware
    return helpers.updateOrderById(Order, req, res, role, User);
  },
  getAll: async (req, res) => {
    const role = req.role;
    return userHelpers.getAll(Order, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Order, req, res, role);
  },
  deleteById: async (req, res) => {
    const role = req.role;
    return userHelpers.deleteById(Order, req, res, role);
  },
};
