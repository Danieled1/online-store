const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Carts = require("../../models/Cart");
const Users = require("../../models/User");
const Orders = require("../../models/Order");
const Products = require("../../models/Product");
const Categories = require("../../models/Category");
const Posts = require("../../models/Post");
const Managers = require("../../models/Manager");
const Admins = require("../../models/Admin");
// ? ? ? Maybe move this into the Manager routes ? ? ?
const create = async (Model, req, res, roleName) => {
  try {
    const { user_name, user_email, user_password, user_phone } = req.body;
    if (!user_name || !user_email || !user_password) {
      throw new Error("Name, Email and Password fields required");
    }
    const hash = await bcrypt.hash(user_password, 15);

    const new_model = new Model({
      user_name,
      user_email,
      user_password: hash,
      user_phone: user_phone || "",
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
};

const getAll = async (Model, req, res, roleName, UserModel) => {
  let modelName = Model.modelName;
  let items;
  const { params } = req;
  try {
    if (!roleName) {
      if (params.category) {
        items = await Model.find({ categories: params.category }).exec();
      } else {
        items = await Model.find({}).exec();
      }
      modelName = Model.modelName;

      console.log(modelName, items);
      return res.status(200).json({
        success: true,
        message: `Successfully retrieved ${modelName} details.`,
        data: items,
      });
    }
    if (roleName === "user") {
      if (Model === Users) {
        // Users can only get their own account details
        const user = await Model.findById(req.user._id).exec();

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Successfully retrieved user details.",
          data: user,
        });
      } else if (Model === Orders) {
        // Users can get details of their completed orders
        const orders = await Model.find({
          user: req.user._id,
          status: 1, //completed
        }).exec();

        return res.status(200).json({
          success: true,
          message: "Successfully retrieved completed orders.",
          data: orders,
        });
      } else {
        // Users can get details of products, posts, categories, and carts (read-only)
        const items = await Model.find({}).exec();

        return res.status(200).json({
          success: true,
          message: `Successfully retrieved ${modelName} details.`,
          data: items,
        });
      }
    } else if (roleName === "manager" || roleName === "admin") {
      if (roleName === "manager" && Model === Admins) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Managers cannot access the Admin model.",
        });
      }

      if (UserModel) {
        items = await Users.find({}).exec();
        modelName = Users.modelName;
      } else {
        items = await Model.find({}).exec();
        modelName = Model.modelName;
      }

      console.log(modelName, items);

      return res.status(200).json({
        success: true,
        message: `Successfully retrieved ${modelName} details.`,
        data: items,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error in getting ${modelName} details`,
      error: error.message,
    });
  }
};

const getById = async (Model, req, res, roleName, UserModel) => {
  try {
    const { model_id } = req.params;
    console.log("model_id\n", model_id, "modelName", modelName, "Model", Model);
    const { path } = req;
    const typeUser = path.split("/")[1];
    var modelName;
    let model;
    if (typeUser === "user") {
      console.log("USER_NAME");
      model = await Users.findById(model_id);
      modelName = Users.modelName;
    } else if (typeUser === "manager") {
      console.log("MANAGER_NAME");
      model = await Managers.findById(model_id);
      modelName = Managers.modelName;
    } else if (typeUser === "admin") {
      console.log("ADMIN_NAME");
      model = await Admins.findById(model_id);
      modelName = Admins.modelName;
    } else {
      model = await Model.findById(model_id);
      modelName = Model.modelName;
    }
    console.log(typeUser);
    console.log(modelName, model, "MODELNAME + MODEL");
    if (!model) {
      return res.status(401).json({
        success: false,
        message: `Retrieve failed. ${modelName} not found.`,
      });
    }
    if (roleName === "user") {
      if (Model === Users && model_id !== req.user._id.toString()) {
        // Users can ONLY get their own account details
        return res.status(401).json({
          success: false,
          message: "Unauthorized to access this details.",
        });
      } else if (Model === Orders) {
        // Users can get details of their completed orders
        const order = await Model.findById(model_id).exec();

        if (!order || order.user.toString() !== req.user._id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized to access this order.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Successfully retrieved order details.",
          data: order,
        });
      } else if (Model === Carts) {
        // Users can get details of their completed Carts
        const cart = await Model.findById(model_id).exec();
        console.log("cart = ", cart);
        if (!cart || cart.user_name.toString() !== req.user._id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized to access this Cart.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Successfully retrieved Cart details.",
          data: cart,
        });
      } else {
        // Users can get details of products, posts, categories (read-only)
        const item = await Model.findById(model_id).exec();
        if (!item) {
          return res.status(401).json({
            success: false,
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully retrieved ${modelName} details.`,
          data: item,
        });
      }
    } else if (roleName === "manager") {
      console.log("ENTER MANAGER");
      if (Model === Admins) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Managers cannot access the Admin model.",
        });
      }
      let item;

      if (UserModel) {
        item = await Users.findById(model_id);
        modelName = Users.modelName;
      } else {
        item = await Model.findById(model_id);
        modelName = Model.modelName;
      }

      console.log(modelName, item);
      if (!item) {
        return res.status(401).json({
          success: false,
          message: `${modelName} not found.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Successfully retrieved ${modelName} details.`,
        data: item,
      });
    } else {
      // admins access all
      console.log("ADMIN");
      if (modelName === Admins.modelName) {
        model = Admins.modelName;
        const item = await Admins.findByIdAndRemove(model_id).exec();
        console.log("ADMIN DELETE", model, "item", item);

        if (!item) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully retrieved ${modelName} details.`,
          data: item,
        });
      } else if (modelName === Users.modelName) {
        console.log("USER DELETE");
        model = Users.modelName;
        const item = await Users.findByIdAndRemove(model_id).exec();

        if (!item) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully retrieved ${modelName} details.`,
          data: item,
        });
      } else if (modelName === Managers.modelName) {
        console.log("MANAGER DELETE");
        model = Managers.modelName;
        const item = await Managers.findByIdAndRemove(model_id).exec();

        if (!item) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully retrieved ${modelName} details.`,
          data: item,
        });
      }

      const item = await Model.findById(model_id).exec();

      if (!item) {
        return res.status(401).json({
          success: false,
          message: `${modelName} not found.`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Successfully retrieved ${modelName} details.`,
        data: item,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Error in getting ${modelName}.(server)`,
      error: error.message,
    });
  }
};

const updateUserById = async (Model, req, res) => {
  try {
    const { user_id } = req.params;
    const user = await Model.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isManagerOrAdmin = req.role === "manager" || req.role === "admin";
    const isUserUpdatingSelf =
      req.role === "user" && user._id.toString() === req.user._id.toString();

    if (isManagerOrAdmin || isUserUpdatingSelf) {
      const updatedUser = await Model.findByIdAndUpdate(user_id, req.body, {
        new: true,
      }).exec();

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Failed to update user",
        });
      }

      const message = isUserUpdatingSelf
        ? `Successfully updated your account`
        : `Successfully updated user's account`;

      return res.status(200).json({
        success: true,
        message,
        data: updatedUser,
      });
    } else {
      throw Error("Unauthorized: You are not allowed to update this user");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating user",
      error: error.message,
    });
  }
};

const deleteById = async (
  Model,
  req,
  res,
  roleName,
  UserModel,
  ManagerModel,
  AdminModel
) => {
  console.log("TEST");
  try {
    const isUser = roleName === "user";
    const isManager = roleName === "manager";
    const isAdmin = roleName === "admin";

    const { model_id } = req.params;
    const { path } = req;
    const typeUser = path.split("/")[1];
    var modelName;
    let model;
    if (typeUser === "user") {
      console.log("USER_NAME");
      model = await Users.findById(model_id);
      modelName = Users.modelName;
    } else if (typeUser === "manager") {
      console.log("MANAGER_NAME");
      model = await Managers.findById(model_id);
      modelName = Managers.modelName;
    } else if (typeUser === "admin") {
      console.log("ADMIN_NAME");
      model = await Admins.findById(model_id);
      modelName = Admins.modelName;
    } else {
      model = await Model.findById(model_id);
      modelName = Model.modelName;
    }
    console.log(typeUser);
    console.log(modelName, model);
    if (!model) {
      return res.status(401).json({
        success: false,
        message: `Deletion failed. ${modelName} not found.`,
      });
    }

    if (isUser) {
      // User can only delete their own account and completed orders
      // Check if the model is an instance of Users
      if (model instanceof Users) {
        const isUserDeletingSelf =
          model._id.toString() === req.user._id.toString();
        if (!isUserDeletingSelf && !isManager) {
          return res.status(403).json({
            success: false,
            message: `Unauthorized: You are not allowed to delete this ${modelName}`,
          });
        }
      }

      // Check if the model is an instance of Orders
      if (model instanceof Orders) {
        const isUserDeletingCompletedOrders = model.status === 3;
        if (!isUserDeletingCompletedOrders) {
          return res.status(403).json({
            success: false,
            message: `Sorry, You are not allowed to delete this order until it is completed.`,
          });
        }
      }
    } else if (isManager) {
      // Manager can delete users, products, posts, orders, categories, carts
      const allowedModels = [
        Users.modelName,
        Products.modelName,
        Posts.modelName,
        Categories.modelName,
        Carts.modelName,
        Managers.modelName,
      ];
      console.log("MANAGER");
      console.log("Model:", modelName); // Add this line to log the Model being used
      if (!allowedModels.includes(modelName)) {
        console.log("Unauthorized: Model not allowed");
        return res.status(403).json({
          success: false,
          message: `Unauthorized: You are not allowed to delete ${modelName}`,
        });
      }
      if (model instanceof Managers) {
        const isManagerDeletingSelf =
          model._id.toString() === req.user._id.toString();
        if (!isManagerDeletingSelf) {
          return res.status(403).json({
            success: false,
            message: `Unauthorized: You are not allowed to delete this ${modelName}`,
          });
        }
      }
      console.log("BETWEEN IFS");
      if (modelName === Users.modelName) {
        const deletedModel = await Users.findByIdAndRemove(model_id).exec();
        modelName = Users.modelName;
        console.log("deleted", deletedModel);
        if (!deletedModel) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully deleted ${modelName}`,
        });
      }
    } else if (isAdmin) {
      // Admin can delete all models
      console.log("ADMIN");
      if (modelName === Admins.modelName) {
        model = Admins.modelName;
        const deletedModel = await Admins.findByIdAndRemove(model_id).exec();
        console.log("ADMIN DELETE", model, "deletedModel", deletedModel);

        if (!deletedModel) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully deleted ${modelName}`,
        });
      } else if (modelName === Users.modelName) {
        console.log("USER DELETE");
        model = Users.modelName;
        const deletedModel = await Users.findByIdAndRemove(model_id).exec();

        if (!deletedModel) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully deleted ${modelName}`,
        });
      } else if (modelName === Managers.modelName) {
        console.log("MANAGER DELETE");
        model = Managers.modelName;
        const deletedModel = await Managers.findByIdAndRemove(model_id).exec();

        if (!deletedModel) {
          return res.status(404).json({
            message: `${modelName} not found`,
          });
        }
        return res.status(200).json({
          success: true,
          message: `Successfully deleted ${modelName}`,
        });
      }
      const deletedModel = await Model.findByIdAndRemove(model_id).exec();
      if (!deletedModel) {
        return res.status(404).json({
          message: `${modelName} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Successfully deleted ${modelName}`,
      });
    }
    if (model instanceof Orders && model.user) {
      // Remove the deleted order from the user's user_orders array
      await Users.findByIdAndUpdate(model.user, {
        $pull: { user_orders: model_id },
      });
    }
    const deletedModel = await Model.findByIdAndRemove(model_id).exec();
    console.log("After Admin Part", deletedModel);
    if (!deletedModel) {
      return res.status(404).json({
        message: `${modelName} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully deleted ${modelName}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to delete.(server) `,
      error: error.message,
    });
  }
};

const login = async (Model, req, res, roleName) => {
  try {
    const { user_email, user_password } = req.body;
    console.log(req.body, Model);
    const user = await Model.findOne({ user_email });
    console.log("USER", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    console.log("IS_MATCH:", isMatch);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password.",
      });
    }
    // Check if the user has a cart
    if (!user.user_cart) {
      // Create an empty cart for the user
      const newCart = new Carts({
        user_name: user._id,
        products: [], // An empty array for products
      });
      await newCart.save();
      console.log("A Cart Created");

      // Update the user's user_cart field with the new cart's ID
      await Model.findByIdAndUpdate(user._id, { user_cart: newCart._id });
    }
    // Here we define the payload for JWT
    const payload = {
      user: user._id,
      role: roleName || "", // include the role name in the payload
    };

    // Generate JWT token with payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const maxTokens = 5;
    let oldTokens = user.tokens || [];
    console.log("TOKEN_GENERATED: ", token);
    if (oldTokens.length >= maxTokens) {
      oldTokens = oldTokens.filter((t) => {
        oldTokens = oldTokens.slice(oldTokens.length - maxTokens);
      });
    }
    await Model.findByIdAndUpdate(user._id, {
      tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
    }).exec();
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,  // Uncomment this line if you're using HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    console.log("LOGGED_USER = ", user);
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
    const user = await Model.findById(decoded.user);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }

    // Remove the token from the user's tokens array
    const updatedTokens = user.tokens.filter((t) => t.token !== token);
    await Model.findByIdAndUpdate(user._id, {
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

const register = async (Model, req, res, roleName) => {
  const {
    user_name,
    user_email,
    user_password,
    user_password_confirm,
    user_phone,
  } = req.body;
  try {
    if (
      !user_name ||
      !user_email ||
      !user_password ||
      !user_password_confirm ||
      !user_phone
    ) {
      throw new Error("All fields required");
    }
    if (user_password !== user_password_confirm) {
      throw new Error("Passwords do not match");
    }
    console.log(req.body);
    const hash = await bcrypt.hash(user_password, 15);
    const new_model = new Model({
      user_name,
      user_email,
      user_password: hash,
      user_phone,
    });
    await new_model.save();
    return res.status(200).json({
      success: true,
      message: "User registered",
      data: new_model,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to register user",
      serverMessage: err.message,
    });
  }
};

const authToken = async (Model, req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("no token provided");
    }

    const bearer = token.split(" ")[1];

    const decode = jwt.verify(bearer, process.env.JWT_SECRET);

    const user = await Model.findById(decode.user).exec();

    if (!user) {
      throw new Error("user not exists");
    }

    return res.status(201).json({
      success: true,
      message: "user authoraized",
      token,
      user: {
        _id: user._id,
        user_name: user.user_name,
        user_email: user.user_email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "unauthoraized",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateUserById,
  deleteById,
  login,
  logout,
  register,
  authToken,
};
