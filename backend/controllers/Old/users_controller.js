let controler_name = "user";
let object_name = "User";
let objects_name = "users";

let Model = require(`../models/${object_name}`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone, user_address } =
        req.body;
      if (!user_name || !user_email || !user_password) {
        throw new Error("Name, Email and Password fields required");
      }
      const hash = await bcrypt.hash(user_password, 15);

      const new_model = new Model({
        user_name,
        user_email,
        user_password: hash,
        user_phone: user_phone || "",
        user_address: user_address || "",
      });
      await new_model.save();
      return res.status(200).json({
        success: true,
        message: `success to add new ${controler_name}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in add ${controler_name}`,
        error: error.message,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const models = await Model.find();
      // .populate(["user_cart", "user_orders.order"])
      // .exec();

      return res.status(200).json({
        success: true,
        message: `success to find all ${objects_name}`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in get all ${objects_name}`,
        error: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const models = await Model.findById(req.params.user_id);
      // .populate(["user_cart", "user_orders.order"])
      // .exec();
      console.log(models);
      return res.status(200).json({
        success: true,
        message: `success to find ${controler_name} by id`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in find ${controler_name} by id}`,
        error: error.message,
      });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const id = req.params.user_id;
      await Model.findByIdAndUpdate(id, req.body).exec();
      return res.status(200).json({
        success: true,
        message: `success to update ${controler_name} by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in update ${controler_name} by id`,
        error: error.message,
      });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const id = req.params.id;

      await Model.findByIdAndDelete(id).exec();

      return res.status(200).json({
        success: true,
        message: `success to delete ${controler_name} by id`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in delete ${controler_name} by id`,
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      if (!user_email || !user_password) {
        throw new Error("All fields required");
      }
      const user = await Model.findOne({ user_email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const equal = await bcrypt.compare(user_password, user.user_password);

      if (!equal) {
        throw new Error("Bad credentials");
      }

      // user login success

      let payload = {
        user: user._id,
        
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 1000,
      });
      let oldTokens = user.tokens || [];

      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 1000) {
            return t;
          }
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
      return res.status(201).json({
        success: true,
        message: "user login seccessfully",
        token,
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in login request",
        error: error.message,
      });
    }
  },
  logout: async (req, res) => {
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
  },
  register: async (req, res) => {
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
  },
  authToken: async (req, res) => {
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
  },
  getCustomerByIdForManager: async (req, res) => {    try {
      const models = await Model.findById(req.params.user_id); /* .populate([
        "user_cart",
        "user_orders.order",
      ]).exec() */

      return res.status(200).json({
        success: true,
        message: `success to find ${controler_name} by id - for manager`,
        [controler_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in find ${controler_name} by id - for manager`,
        error: error.message,
      });
    }
  },
  // managers requests
  getAllCustomersForManager: async (req, res) => {
    try {
      /*       const models = await Model.find().populate([
        "user_cart",
        "user_orders.order",
      ]).exec(); */

      const models = await Model.find().exec();

      console.log(models);

      return res.status(200).json({
        success: true,
        message: `success to find all ${objects_name} - for manager`,
        [objects_name]: models,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in get all ${objects_name}  - for manager`,
        error: error.message,
      });
    }
  },
  deleteUserByIdForManager: async (req, res) => {
    try {
      const id = req.params.user_id;

      await Model.findByIdAndDelete(id).exec();

      return res.status(200).json({
        success: true,
        message: `success to delete ${controler_name} by id -  - for managers`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in delete ${controler_name} by id - for managers`,
        error: error.message,
      });
    }
  },
  addUserForManager: async (req, res) => {
    try {
      // gettind values from the body request
      const { user_name, user_email, user_password, user_phone, user_address } =
        req.body;

      // creating new model using the values from req.body
      const new_model = new Model({
        user_name,
        user_email,
        user_password,
        user_phone: user_phone || "",
        user_address: user_address || "",
      });

      // actual saving
      await new_model.save();

      // return success message
      return res.status(200).json({
        success: true,
        message: `success to add new ${controler_name}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in add ${controler_name}`,
        error: error.message,
      });
    }
  },
  updateUserByIdForManager: async (req, res) => {
    try {
      const id = req.params.user_id;

      if (req.body.user_name == "") {
        delete req.body.user_name;
      }
      if (req.body.user_email == "") {
        delete req.body.user_email;
      }
      if (req.body.user_password == "") {
        delete req.body.user_password;
      }
      if (req.body.user_phone == "") {
        delete req.body.user_phone;
      }

      const user = await Model.findById(id);

      Object.assign(user, req.body);

      const updateUser = await user.save();

      // await Model.findByIdAndUpdate(id, req.body).exec();

      return res.status(200).json({
        success: true,
        message: `success to update ${controler_name} by id`,
        updateUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error in update ${controler_name} by id`,
        error: error.message,
      });
    }
  },
};
