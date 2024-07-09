const express = require("express");

const router = express.Router();

const consultationsController = require("../../controllers/consultationsController");
const usersController = require("../../controllers/usersController");
const authController = require("../../controllers/authController");

//middlewares
const { hashPassword, verifyToken } = require("../../services/auth");

//users action
router.get("/users", usersController.browse);
router.post("/users", hashPassword, usersController.add);

//auth
router.post("/login", authController.login);

router.use(verifyToken);

//constultations
router.get("/consultations", consultationsController.browse);

module.exports = router;
