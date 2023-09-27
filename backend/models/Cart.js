const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cart_schema = new Schema(
  {
    user_name: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          max: 20,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carts", cart_schema);
