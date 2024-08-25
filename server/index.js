
import express from 'express';
import cors from 'cors';

import postRoutes from './src/module/posts/posts.routes.js';
import userRouter from "./src/module/user/user.routes.js";
import db from './db/db.js';
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

const allowedOrigins = [
    'https://moment-insgtram-mern.vercel.app',
];


const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));



app.use('/posts', postRoutes);
app.use("/user", userRouter);
db
const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
app.get('/', (req, res) => {
    res.send('Hello from Vercel lets see then22!');
})