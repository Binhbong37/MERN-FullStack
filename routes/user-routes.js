const express = require("express");

const router = express.Router();

const userController = require("../controller/user-controller");

router.post("/register", userController.postUsers);

router.post("/login", userController.postLogin);

module.exports = router;
