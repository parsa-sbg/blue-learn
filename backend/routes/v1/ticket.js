const express = require("express");

const isAdminMiddleware = require("../../middlewares/isAdmin");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const controller = require("../../controllers/v1/ticket");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, controller.create)
  .get(authenticatedMiddleware, isAdminMiddleware, controller.getAll);

router.route("/user").get(authenticatedMiddleware, controller.userTickets);

router.route("/departments").get(controller.departments);
router.route("/departments-subs/:id").get(controller.departmentsSubs);

router
  .route("/answer")
  .post(authenticatedMiddleware, isAdminMiddleware, controller.setAnswer);

router.route("/answer/:id").get(authenticatedMiddleware, controller.getAnswer);

module.exports = router;
