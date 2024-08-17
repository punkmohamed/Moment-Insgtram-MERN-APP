import express from "express";
const router = express.Router();

import { getUser, signin, signup } from "./user.controllers.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getUser);

export default router;