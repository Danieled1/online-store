const helpers = require("./helperCategory");
const userHelpers = require("../User/helperUser");
const Category = require("../../models/Category");

/* ---------------------------- NEED TO CLEAN UP ---------------------------- */
/* ------------------------------------ x ----------------------------------- */
/* ------------------------------------ x ----------------------------------- */
module.exports = {
  addCategory: async (req, res) => {
    const role = req.role; // Role is set by the middleware

    if (role !== "admin" && role !== "manager") {
      // Only allow 'admin' and 'manager' roles to add orders
      return res.status(403).json({
        message: "Unauthorized to add orders.",
      });
    }

    return helpers.create(Category, req, res); // Use the addOrder helper method here
  },
  updateById: async (req, res) => {
    const role = req.role; // Role is set by the middleware

    if (role !== "admin" && role !== "manager") {
      // Only allow 'admin' and 'manager' roles to add orders
      return res.status(403).json({
        message: "Unauthorized to add orders.",
      });
    }

    return helpers.updateById(Category, req, res); // Use the addOrder helper method here
  },
  getAll: async (req, res) => {
    const role = req.role;
    return userHelpers.getAll(Category, req, res, role);
  },
  getById: async (req, res) => {
    const role = req.role;
    return userHelpers.getById(Category, req, res, role);
  },
  deleteById: async (req, res) => {
    const role = req.role;
    return userHelpers.deleteById(Category, req, res, role);
  },
};
