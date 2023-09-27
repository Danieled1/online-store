const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const post_schema = new Schema({
  post_name: {
    type: String,
    required: true,
    unique: true,
  },

  post_description: {
    type: String,
  },

  post_author: {
    type: String,
    required: true,
    min: [1, "must be positive"],
  },

  post_image: {
    type: String,
    match: [/\.(jpg|jpeg|png)$/i, "must be a valid image link"],
  },
}, {timestamps: true});

post_schema.plugin(uniqueValidator, {
  message: "Error, allready exists {PATH} with this value : {VALUE}",
});

module.exports = mongoose.model("Posts", post_schema);
