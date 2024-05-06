const express = require("express");

const userController = require("../../controllers/v1/user");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const isAuthenticated = require("./../../middlewares/authenticated");

const router = express.Router();

// router.use(authenticatedMiddleware);

router
  .route("/")
  //   .post(
  //     // multer({ storage: multerStorage }).single('cover'),
  //     authenticatedMiddleware,
  //     isAdminMiddleware,
  //     courseController.create
  //   )
  .get(isAuthenticated, isAdminMiddleware, userController.getAll)
  .put(isAuthenticated, userController.updateUser);

router
  .route("/:id")
  .delete(isAuthenticated, isAdminMiddleware, userController.removeUser)
  .put(isAuthenticated, isAdminMiddleware, userController.editUser);

router
  .route("/ban/:id")
  .put(isAuthenticated, isAdminMiddleware, userController.banUser);

router.route("/courses").get(isAuthenticated, userController.getUserCourses);
router
  .route("/role")
  .put(isAuthenticated, isAdminMiddleware, userController.changeUserRole);

module.exports = router;
