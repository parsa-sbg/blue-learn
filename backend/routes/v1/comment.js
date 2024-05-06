const express = require("express");

const commentController = require("../../controllers/v1/comment");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authenticatedMiddleware, commentController.create)
  .get(commentController.getAll);

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdminMiddleware, commentController.remove);

router
  .route("/answer/:id")
  .post(authenticatedMiddleware, isAdminMiddleware, commentController.answer);

router
  .route("/accept/:id")
  .put(authenticatedMiddleware, isAdminMiddleware, commentController.accept);

  router
  .route("/reject/:id")
  .put(authenticatedMiddleware, isAdminMiddleware, commentController.reject);

// router
//   .route("/:id/sessions")
//   .post(isAdminMiddleware, commentController.createSession);

// router.route("/:id/register").post(commentController.register);

module.exports = router;
