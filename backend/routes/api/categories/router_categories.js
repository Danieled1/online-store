const express = require("express");
const router = express.Router();
const roleMiddleware = require("../../../middlewares/auth_roles");
const categoryController = require("../../../controllers/Category/controller_category");

router.post(
  "/category/add",
  roleMiddleware(["manager", "admin"]),
  categoryController.addCategory
);
router.put(
  "/category/:category_id",
  roleMiddleware(["manager", "admin"]),
  categoryController.updateById
);
router.get(
  "/",
  // roleMiddleware(["user", "manager", "admin"]),
  categoryController.getAll
);

router.get(
  "/category/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  categoryController.getById
);
router.delete(
  "/category/:model_id",
  roleMiddleware(["manager", "admin"]),
  categoryController.deleteById
);
module.exports = router;
