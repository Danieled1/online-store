const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Manager = require("../models/Manager");
const Admin = require("../models/Admin");

const roleModelMap = {
  user: User,
  manager: Manager,
  admin: Admin,
};

module.exports = (roles) => {
  return async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access! Session expired, please sign in!",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const roleFromPayload = decode.role;
      const isManagerOrAdmin =
        roleFromPayload === "manager" || roleFromPayload === "admin";
      if (!roles.includes(roleFromPayload) && !isManagerOrAdmin) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access! Role not allowed.",
        });
      }
      const Model = roleModelMap[roleFromPayload];
      const user = await Model.findById(
        decode[roleFromPayload] || decode["user"]
      ); //line 40 NEED TO CHECK WHICH ONE REALLY WORKS 
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access! User not found.",
        });
      }

      req.user = user;
      req.role = roleFromPayload;

      next();
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error!" });
    }
  };
};
