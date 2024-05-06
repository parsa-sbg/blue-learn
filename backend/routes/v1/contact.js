const express = require("express");

const controller = require("../../controllers/v1/contact");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);
router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdminMiddleware, controller.remove);

router
  .route("/answer")
  .post(authenticatedMiddleware, isAdminMiddleware, controller.asnwer);

module.exports = router;
