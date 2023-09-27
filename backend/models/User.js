const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const user_schema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },

    user_email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },

    user_password: {
      type: String,
      required: true,
    },

    user_phone: {
      type: String,
      match: /^([0]\d{1,3}[-])?\d{7,10}$/,
    },

    user_address: {
      city: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },

      building: {
        type: String,
        trim: true,
      },

      appartment: {
        type: String,
        trim: true,
      },
    },
    user_cart: {
      type: mongoose.Types.ObjectId,
      ref: "carts",
    },

    user_orders: [
      {
        order: {
          type: mongoose.Types.ObjectId,
          ref: "Orders",
        },
      },
    ],

    tokens: [{ type: Object }],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Users", user_schema);
