const express = require("express");
const { createChat } = require("../controllers/ChatController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createChat);
// router.get("/", auth, getChats);
// router.post("/group", auth, crateGroupChat);
// router.patch("/group", auth, updateGroupChat);
// router.get("/", auth, getChats);
// router.get("/", auth, getChats);

const ChatRoute = router;
module.exports = ChatRoute;
