const express = require("express");
const router = express.Router();
const roleMiddleware = require("../../../middlewares/auth_roles");
const cartController = require("../../../controllers/Cart/controllerCart");

router.post(
  "/add",
  roleMiddleware(["manager", "admin", "user"]),
  cartController.createNewCart
);
router.put(
  "/:user_id",
  roleMiddleware(["user", "admin"]),
  cartController.updateById
);
router.get("/", roleMiddleware(["manager", "admin"]), cartController.getAll);

router.get(
  "/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  cartController.getById
);
// Maybe remove deletion? 
router.delete(
  "/:model_id",
  roleMiddleware(["user", "manager", "admin"]),
  cartController.deleteById
);
module.exports = router;
