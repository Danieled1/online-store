// add role permssions like on the newer versions of manager/categories/cart/order/admin!!!!!
const create = async (Model, req, res, roleName) => {
  try {
    const { product_name, product_description, product_price, product_rating } = req.body;
    const product_image = req.file;
    const imagePath = product_image ? `http://localhost:3000/uploads/${product_image.filename}` : "";

    if (!product_name || !product_description || !product_price) {
      throw new Error("Name, Description and Price fields required");
    }
    
    const new_model = new Model({
      product_name,
      product_description,
      product_price,
      product_rating,
      product_image: imagePath || "",
    });
    await new_model.save();
    return res.status(201).json({
      success: true,
      message: `Successfully added new product: ${new_model.product_name}`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error in adding new ${roleName}`,
      error: error.message,
    });
  }
};

const updateById = async (Model, req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Model.findById(product_id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (req.file) {
      const product_image = req.file;
      const imagePath = product_image ? `/uploads/${product_image.filename}` : "";
      product.product_image = imagePath;
    }
    Object.assign(product, req.body);

    await product.save();
    const message = `Successfully updated product`;

    return res.status(200).json({
      success: true,
      message,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "failed to update product",
      serverMessage: err.message,
    });
  }
};

module.exports = {
  create,
  updateById,
};
