const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post('/bulk', authController.bulkRegister);

module.exports = router;
