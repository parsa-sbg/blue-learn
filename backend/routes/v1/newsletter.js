const express = require("express");

const controller = require("../../controllers/v1/newsletter");

const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);

module.exports = router;
