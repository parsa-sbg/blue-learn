const express = require("express");
const controller = require("../../controllers/v1/search");

const router = express.Router();

router.route("/:value").get(controller.get);

module.exports = router;
