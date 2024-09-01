
import express from 'express';

import db from './db/db.js';
import dotenv from "dotenv";
import postRoutes from './src/module/posts/posts.routes.js';
import userRoutes from './src/module/user/user.routes.js';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

const allowedOrigins = [
    'http://localhost:5173', // Add your frontend origin here
    'https://moment-insgtram-mern.vercel.app', // Add other allowed origins here
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // This allows credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));





app.use('/api/posts', postRoutes);
app.use("/api/user", userRoutes);
db
const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
