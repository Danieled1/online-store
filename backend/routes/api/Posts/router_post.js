const express = require("express");
const router = express.Router();
const roleMiddleware = require("../../../middlewares/auth_roles");
const postController = require("../../../controllers/Post/controllerPost");
const upload = require("../../../middlewares/upload");

router.get(
  "/",
  // roleMiddleware(["user", "manager", "admin"]),
  postController.getAll
);

router.get(
  "/post/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  postController.getById
);

router.post(
  "/post/add",
  roleMiddleware(["manager", "admin"]),
  upload.single("post_image"),
  postController.addPost
);

router.put(
  "/post/:post_id",
  roleMiddleware(["manager", "admin"]),
  upload.single("post_image"),
  postController.updateById
);

router.delete(
  "/post/:model_id",
  roleMiddleware(["manager", "admin"]),
  postController.deleteById
);

module.exports = router;
