import express from "express";
const userRoutes = express.Router();

import { getUser, signin, signup } from "./user.controllers.js";

userRoutes.post("/signin", signin);
userRoutes.post("/signup", signup);
userRoutes.get("/", getUser);

export default userRoutes;