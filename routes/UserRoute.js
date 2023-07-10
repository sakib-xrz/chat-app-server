const express = require("express");
const { registerUser, getUser } = require("../controllers/UserController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.get("/", auth, getUser);

const UserRoute = router;
module.exports = UserRoute;
