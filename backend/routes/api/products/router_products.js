const express = require("express");
const router = express.Router();
const roleMiddleware = require("../../../middlewares/auth_roles");
const productsController = require("../../../controllers/Product/controller_product");
const upload = require("../../../middlewares/upload");


router.delete(
  "/product/:model_id",
  roleMiddleware(["manager", "admin"]),
   productsController.deleteById
);

router.get(
  "/product/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  productsController.getById
);

router.post(
  "/product/add",
  roleMiddleware(["manager", "admin"]),
  upload.single("product_image"),
  productsController.addProduct
);

router.put(
  "/product/:product_id",
  roleMiddleware(["manager", "admin"]),
  upload.single("product_image"),
  productsController.updateById
);

router.get(
  "/",
  // roleMiddleware(["user", "manager", "admin"]),
  productsController.getAll
);

module.exports = router;
