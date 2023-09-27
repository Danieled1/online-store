const userHelpers = require('../User/helperUser')
const helpers = require("./helperAdmin");
const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");

const roleModelMap = {
  user: User,
  manager: Manager,
  admin: Admin,
};

module.exports = {
  addManager: async (req, res) => {
    const role = req.role; 
    return helpers.addManager(Manager, req, res, role);
  },
  login: async (req,res) => {
    const role = req.path.split('/')[1]; 
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return helpers.login(Admin, req, res, role);
  },
  logout: async (req,res) => {
    const role = req.path.split('/')[1]; 
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return userHelpers.logout(Admin, req, res, role);
  },
  addAdmin: async(req,res) => {
    const role = req.role;
    return helpers.addAdmin(Admin, req, res, role);
  },
  updateById: async (req, res) => {
    const role = req.role;
    return helpers.updateAdminById(Admin, req, res, role);
  },
  deleteById: async(req, res) => {
    const role = req.role;
    return userHelpers.deleteById(Admin, req, res, role, User, Manager);
  },
  getAll: async (req, res) => {
    const role = req.role;
    return userHelpers.getAll(Admin, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Admin, req, res, role);
  },
};
