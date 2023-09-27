const express = require("express");
const router = express.Router();
const roleMiddleware = require("../../../middlewares/auth_roles");
const ordersController = require("../../../controllers/Order/controller_order");

router.post(
  "/order/add",
  roleMiddleware(["manager", "admin", "user"]),
  ordersController.addOrder
);
router.put(
  "/user/:user_id/order/:order_id",
  roleMiddleware(["user", "admin"]),
  ordersController.updateById
);
router.get(
  "/",
  roleMiddleware(["user", "manager", "admin"]),
  ordersController.getAll
);

router.get(
  "/order/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  ordersController.getById
);
router.delete(
  "/order/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  ordersController.deleteById
);
module.exports = router;
