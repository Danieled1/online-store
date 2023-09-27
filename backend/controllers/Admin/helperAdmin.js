const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addManager = async (Model, req, res, roleName) => {
  try {
    const { manager_name, manager_email, manager_password } = req.body;
    if (!manager_name || !manager_email || !manager_password) {
      throw new Error("Name, Email and Password fields required");
    }
    const hash = await bcrypt.hash(manager_password, 15);
    
    const new_model = new Model({
      manager_name,
      manager_email,
      manager_password: hash,
    });
    console.log(new_model,"new Manager");
    await new_model.save();
    return res.status(201).json({
      success: true,
      message: `Successfully added ${new_model.manager_name}`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error in adding new Manager`,
      error: error.message,
    });
  }
};
const login = async (Model, req, res, roleName) => {
  try {
    const { admin_email, admin_password } = req.body;

    if (!admin_email || !admin_password) {
      return res.status(400).json({
        success: false,
        message: "Both admin_email and admin_password are required.",
      });
    }

    const admin = await Model.findOne({ admin_email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Admin not found.",
      });
    }

    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password.",
      });
    }

    const payload = {
      user: admin._id, // Change "user" to match the payload structure of your application
      role: roleName || "", // Include the role name in the payload
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    let oldTokens = admin.tokens || [];

    if (oldTokens.length) {
      oldTokens = oldTokens.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 1000) {
          return t;
        }
      });
    }

    await Model.findByIdAndUpdate(admin._id, {
      tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
    }).exec();

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,  // Uncomment this line if using HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return res.status(200).json({
      success: true,
      message: `Successfully logged in as ${roleName}`,
      token,
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
    const admin = await Model.findById(decoded.user);
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }

    // Remove the token from the user's tokens array
    const updatedTokens = admin.tokens.filter((t) => t.token !== token);
    await Model.findByIdAndUpdate(admin._id, {
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
const addAdmin = async (Model, req, res, roleName) => {
  try {
    const { admin_name, admin_email, admin_password } = req.body;
    if (!admin_name || !admin_email || !admin_password) {
      throw new Error("Name, Email and Password fields required");
    }
    const hash = await bcrypt.hash(admin_password, 15);

    const new_model = new Model({
      admin_name,
      admin_email,
      admin_password: hash,
    });
    await new_model.save();
    return res.status(201).json({
      success: true,
      message: `Successfully added new ${roleName}`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error in adding new ${roleName}`,
      error: error.message,
    });
  }
}
const updateAdminById = async (Model, req, res) => {
  try {
    const { admin_id } = req.params;
    const admin = await Model.findById(admin_id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isAdmin = req.role === "admin";

    if (isAdmin && admin._id.toString() === req.user._id.toString()) {
      const updatedAdmin = await Model.findByIdAndUpdate(admin_id, req.body, {
        new: true,
      }).exec();

      if (!updatedAdmin) {
        return res.status(404).json({
          success: false,
          message: "Failed to update admin",
        });
      }

      const message = isAdmin
        ? `Successfully updated admin`
        : `Successfully updated your account`;

      return res.status(200).json({
        success: true,
        message,
      });
    } else {
      throw Error("Unauthorized: You are not allowed to update this admin");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating admin",
      error: error.message,
    });
  }
};



module.exports = {
  login,
  addAdmin,
  addManager,
  updateAdminById
}