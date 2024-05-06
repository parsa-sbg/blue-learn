const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/infos");

const router = express.Router();

router.route("/index").get(controller.getIndex);

router
  .route("/p-admin")
  .get(authenticatedMiddleware, isAdminMiddleware, controller.getPAdmin);

module.exports = router;
