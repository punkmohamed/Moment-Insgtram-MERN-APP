import express from "express";
const userRoutes = express.Router();

import { getUser, signin, signup, updateUser } from "./user.controllers.js";

userRoutes.post("/signin", signin);
userRoutes.post("/signup", signup);
userRoutes.patch("/update/:id", updateUser);
userRoutes.get("/", getUser);

export default userRoutes;