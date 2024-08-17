
import express from 'express';
import cors from 'cors';

import postRoutes from './src/module/posts/posts.routes.js';
import userRouter from "./src/module/user/user.routes.js";
import db from './db/db.js';
import dotenv from "dotenv";
import { signin, signup } from './../client/src/actions/auth';
import { getUser } from './src/module/user/user.controllers';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

app.post("/user/signin", signin);
app.post("/user/signup", signup);
app.get("/user", getUser);

// app.use("/user", userRouter);
db

app.listen(3000, () => console.log(`Example app listening on port ${port}!`))
app.get('/', (req, res) => {
    res.send('Hello from Vercel lets see then55!')
});