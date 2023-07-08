const express = require("express");
const { loginUser, refreshToken } = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/refresh-token", refreshToken);

const AuthRoute = router;
module.exports = AuthRoute;
