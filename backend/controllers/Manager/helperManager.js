const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Manager = require("../../models/Manager");
const User = require("../../models/User");
const Admin = require("../../models/Admin");

const login = async (Model, req, res, roleName) => {
  try {
    const { manager_email, manager_password } = req.body;

    if (!manager_email || !manager_password) {
      return res.status(400).json({
        success: false,
        message: "Both manager_email and manager_password are required.",
      });
    }

    const manager = await Model.findOne({ manager_email });

    if (!manager) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Manager not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      manager_password,
      manager.manager_password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password.",
      });
    }

    const payload = {
      user: manager._id,
      role: roleName || "",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const updatedTokens = [
      ...manager.tokens.filter(
        (t) => (Date.now() - parseInt(t.signedAt)) / 1000 < 1000
      ),
      { token, signedAt: Date.now().toString() },
    ];

    await Model.findByIdAndUpdate(manager._id, { tokens: updatedTokens });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return res.status(200).json({
      success: true,
      message: `Successfully logged in as ${roleName}`,
      manager: manager,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in ${roleName} login`,
      error: error.message,
    });
  }
};
const logout = async (Model, req, res, roleName) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const manager = await Model.findById(decoded.user);
    if (!manager) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }

    // Remove the token from the user's tokens array
    const updatedTokens = manager.tokens.filter((t) => t.token !== token);
    await Model.findByIdAndUpdate(manager._id, {
      tokens: updatedTokens,
    }).exec();

    // Clear the cookie
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in logout request",
      error: error.message,
    });
  }
};

const updateManagerById = async (Model, req, res) => {
  try {
    const { manager_id } = req.params;
    const manager = await Model.findById(manager_id);

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Manager not found",
      });
    }

    const isAdmin = req.role === "admin";

    if (isAdmin || manager._id.toString() === req.user._id.toString()) {
      const updatedManager = await Model.findByIdAndUpdate(manager_id, req.body, {
        new: true,
      }).exec();

      if (!updatedManager) {
        return res.status(404).json({
          success: false,
          message: "Failed to update manager",
        });
      }

      const message = isAdmin
        ? `Successfully updated manager`
        : `Successfully updated your account`;

      return res.status(200).json({
        success: true,
        message,
      });
    } else {
      throw Error("Unauthorized: You are not allowed to update this manager");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating manager",
      error: error.message,
    });
  }
};


module.exports = {
  login,
  logout,
  updateManagerById,
};
