const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/category");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, isAdminMiddleware, controller.create)
  .get(controller.getAll);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdminMiddleware, controller.remove)
  .put(authenticatedMiddleware, isAdminMiddleware, controller.update);

module.exports = router;
