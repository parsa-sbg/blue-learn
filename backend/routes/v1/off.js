const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/off");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, isAdminMiddleware, controller.create)
  .get(authenticatedMiddleware, isAdminMiddleware, controller.getAll);

router.route("/all").post(authenticatedMiddleware, isAdminMiddleware, controller.setOnAll);

router.route("/:code").post(authenticatedMiddleware, controller.getOne);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdminMiddleware, controller.remove);

module.exports = router;
