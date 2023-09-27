// add role permssions like on the newer versions of manager/categories/cart/order/admin!!!!!
const create = async (Model, req, res, roleName) => {
  try {
    const { post_name, post_description, post_author } = req.body;
    if (!post_name || !post_description || !post_author) {
      throw new Error("Name, Descripition and author fields required");
    }
    const post_image = req.file;
    const imagePath = post_image ? `http://localhost:3000/uploads/${post_image.filename}` : "";

    console.log("POST_IMAGE",post_image);
    const new_model = new Model({
      post_name,
      post_description,
      post_author,
      post_image: imagePath || "",
    });

    await new_model.save();
    console.log("NEW_MODEL",new_model)
    return res.status(201).json({
      success: true,
      message: `Successfully added new Post`,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error in adding new Post`,
      error: error.message,
    });
  }
};
const updateById = async (Model, req, res) => {
  try {
    const { post_id } = req.params;
    const post = await Model.findById(post_id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    if (req.file) {
      const post_image = req.file;
      const imagePath = post_image ? `/uploads/${post_image.filename}` : "";
      post.post_image = imagePath;
    }
    Object.assign(post, req.body);

    await post.save();

    const message = `Successfully updated post`;

    return res.status(200).json({
      success: true,
      message,
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      message: "failed to update post",
      serverMessage: err.message,
    });
  }
};

module.exports = {
  create,
  updateById,
};
