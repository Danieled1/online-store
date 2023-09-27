// helpers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = async (Model, req, res, roleName) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      throw new Error("Category name is required");
    }
    const new_model = new Model({
      category_name,
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
const updateById = async (Model, req, res, roleName) => {
  try {
    const { category_id } = req.params;
    const { category_name } = req.body;

    const isManagerOrAdmin = req.role === "manager" || req.role === "admin";
    if (!isManagerOrAdmin) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You are not allowed to update this order",
      });
    }
    if (!category_name) {
      throw new Error("Category Name is Required");
    }
    const updatedCategory = await Model.findByIdAndUpdate(
      category_id,
      {category_name},
      {
        new: true,
      }
    ).exec();

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Failed to update category`,
      serverMessage: err.message,
    });
  }
};

module.exports = {
  create,
  updateById,
};
