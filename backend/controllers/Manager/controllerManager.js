// helpers.js
const helpers = require("./helperManager");
const userHelpers = require('../User/helperUser')
const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");

const roleModelMap = {
  manager: Manager,
};

module.exports = {
  login: async (req, res) => {
    const role = req.path.split("/")[1]; 
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return helpers.login(Manager, req, res, role);
  
  },
  logout: async (req, res) => {
    const role = req.path.split("/")[1];
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return userHelpers.logout(Manager, req, res, role);
  },
  updateById: async (req, res) => {
    const role = req.role;
    return helpers.updateManagerById(Manager, req, res, role);
  },
  deleteById: async(req, res) => {
    const role = req.role;
    return userHelpers.deleteById(Manager, req, res, role);
  },
  getAll: async (req, res) => {
    const role = req.role;
    return userHelpers.getAll(Manager, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Manager, req, res, role);
  },
};
