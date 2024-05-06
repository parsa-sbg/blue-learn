const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/order");

const router = express.Router();

router.route("/").get(authenticatedMiddleware, controller.getAll);

router.route("/:id").get(authenticatedMiddleware, controller.getOne);

// router
//   .route("/:id")
//   .delete(authenticatedMiddleware, isAdminMiddleware, controller.remove);

module.exports = router;
