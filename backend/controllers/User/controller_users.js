const helpers = require("./helperUser");
const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");

const roleModelMap = {
  user: User,
  manager: Manager,
  admin: Admin,
};

module.exports = {
  addUser: async (req, res) => {
    const role = req.role; 
    const Model = roleModelMap[role];
    return helpers.create(Model, req, res, role);
  },

  getAllUsers: async (req, res) => {
    const role = req.role;
    const Model = roleModelMap[role];
    return helpers.getAll(Model, req, res, role, User);
  },

  getUserById: async (req, res) => {
    const role = req.role;
    const Model = roleModelMap[role];
    return helpers.getById(Model, req, res, role, User);
  },

  updateUserById: async (req, res) => {
    return helpers.updateUserById(User, req, res);
  },

  deleteUserById: async (req, res) => {
    const role = req.role;
    const Model = roleModelMap[role];
    return helpers.deleteById(Model, req, res, role, User);
  },

  login: async (req, res) => {
    // For login, we'll determine the model based on the path.  "/api/users/:role/login"
    const role = req.path.split("/")[1]; 
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return helpers.login(Model, req, res, role);
  },

  logout: async (req, res) => {
    const role = req.path.split("/")[1];
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return helpers.logout(Model, req, res, role);
  },
  
  register: async (req, res) => {
    const role = req.path.split("/")[1];
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).json({
        message: `Invalid role specified`,
      });
    }
    return helpers.register(Model, req, res, role);
  },
  authToken: async(req,res) => {
    const role = req.path.split('/')[1];
    const Model = roleModelMap[role];
    return helpers.authToken(Model,req,res);
  }
};
