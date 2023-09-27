// helpers.js
const bcrypt = require("bcrypt");
const create = async (Model, req, res, User) => {
  try {
    const { _id } = req.user;

    const { customer_details, payment_details, products } = req.body;
    if (!customer_details || !payment_details || !products) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newOrder = new Model({
      user: _id.toString(),
      customer_details,
      payment_details,
      products,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(_id, {
      $push: { user_orders: { order: newOrder._id } },
    });

    return res.status(201).json({
      success: true,
      message: `Successfully added a new Order`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error in adding new Order`,
      error: error.message,
    });
  }
};

const updateOrderById = async (Order, req, res, role, User) => {
  try {
    const { user_id, order_id } = req.params;
    let allowedFields = {};

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isUserUpdatingSelf =
      role === "user" && user._id.toString() === req.user._id.toString();
    if (!isUserUpdatingSelf) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You are not allowed to update other orders",
      });
    }
    const order = user.user_orders.find(
      (order) => order.order.toString() === order_id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found in that user",
      });
    }
    const completeOrder = await Order.findById(order.order);
    if (!completeOrder) {
      return res.status(404).json({
        success: false,
        message: "Complete order not found",
      });
    }
    if (completeOrder.status === 2 || completeOrder.status === 3) {
      return res.status(403).json({
        success: false,
        message: "Order status does not allow updates",
      });
    }
    const isManagerOrAdmin = role === "manager" || role === "admin";

    if (isManagerOrAdmin) {
      // Admins and managers can update any fields
      allowedFields = req.body;
    } else if (isUserUpdatingSelf) {
      // Users can only update specific fields (customize this based on your requirements)
      allowedFields.customer_details = req.body.customer_details;
    } else {
      // Unauthorized user
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You are not allowed to update this order",
      });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      allowedFields,
      {
        new: true,
      }
    ).exec();
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Failed to update order",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully updated order",
      data: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: err.message,
    });
  }
};

module.exports = {
  create,
  updateOrderById,
};
