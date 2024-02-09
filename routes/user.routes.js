import express from "express";
import verifyToken from "../middleware/verifyToken.js";

import { getAllUser, getMe } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAllUser);

router.get("/me", verifyToken, getMe);

export default router;
