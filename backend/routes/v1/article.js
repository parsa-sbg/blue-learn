const express = require("express");
const multer = require("multer");

const articleController = require("../../controllers/v1/articleController");
const multerStorage = require("../../util/multerStorage");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

// router.use(authenticatedMiddleware);

router
  .route("/")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    authenticatedMiddleware,
    isAdminMiddleware,
    articleController.create
  )
  .get(articleController.getAll);

router.route("/:shortName").get(articleController.getOne);

router
  .route("/draft")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    authenticatedMiddleware,
    isAdminMiddleware,
    articleController.saveDraft
  );

router
  .route("/:id")
  .delete(authenticatedMiddleware, isAdminMiddleware, articleController.remove);

module.exports = router;
