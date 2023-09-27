const helpers = require("./helperPost");
const userHelpers = require('../User/helperUser')

const User = require("../../models/User");
const Manager = require("../../models/Manager");
const Admin = require("../../models/Admin");
const Post = require('../../models/Post');

const roleModelMap = {
  user: User,
  manager: Manager,
  admin: Admin,
};

module.exports = {
  addPost: async (req, res) => {
    const role = req.role; // Role is set by the middleware
    const Model = roleModelMap[role];
    return helpers.create(Post, req, res, role);
  },
  updateById: async (req, res) => {
    const role = req.role; // Role is set by the middleware
    return helpers.updateById(Post, req, res, role);
  },
  deleteById: async (req, res) => {
    return userHelpers.deleteById(Post, req, res);
  },
  getAll: async (req, res) => {
    let role = req.role;
    console.log(role,"ROLE");
    return userHelpers.getAll(Post, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Post, req, res, role);
  },
  
};
