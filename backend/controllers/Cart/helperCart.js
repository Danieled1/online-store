// helpers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const create = async (Cart, req, res, roleName) => {
  try {
    const { user_name, products } = req.body;
    if (!user_name || !products) {
      throw new Error("All fields required");
    }
    // if(products.length > 0 ){
    //   throw new Error("No products in your cart");

    // }
    const new_model = new Cart({
      user_name,
      products,
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
const update = async (Cart, req, res, User) => {
  try {
    const { user_id } = req.params;
    const isManagerOrAdmin = req.role === "manager" || req.role === "admin";
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if(!user.user_cart){
      return res.status(404).json({
        message: "User not logged in, need to generate a cart first.",
      });
    }
    const cart_id  = user.user_cart.toString();
    const cart = await Cart.findById(cart_id);
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }    // Check if the cart belongs to the user
    if (cart.user_name.toString() !== user_id.toString() && !isManagerOrAdmin) {
      return res.status(401).json({
        message: "Unauthorized to update this cart",
      });
    }
    
    req.body.products.forEach((item) => {
      if (item.quantity < 1 || item.quantity > 20) {
        throw new Error('Quantity must be between 1 and 20');
      }
    });
    Object.assign(cart, req.body);

    const updatedCart = await cart.save();

    return res.status(200).json({
      success: true,
      message: updatedCart,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to update cart",
      serverMessage: err.message,
    });
  }
};

module.exports = {
  create,
  update,
};
