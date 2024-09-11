
import express from 'express';

import db from './db/db.js';
import dotenv from "dotenv";
import postRoutes from './src/module/posts/posts.routes.js';
import userRoutes from './src/module/user/user.routes.js';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import notificationsRoutes from './src/module/notifications/notifications.routes.js';



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
    credentials: true,
};

app.use(cors(corsOptions));


// Dictionary to store connected users (userId: socketId)
const connectedUsers = {};

// Middleware to attach io to requests
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    next();
});



app.use('/api/posts', postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationsRoutes);

db

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});


io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // User will send their ID on connect
    socket.on('register', (userId) => {
        connectedUsers[userId] = socket.id;  // Save userId and socketId
        console.log(`User ${userId} connected with socket ID ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
        // Remove user from connectedUsers when they disconnect
        for (let userId in connectedUsers) {
            if (connectedUsers[userId] === socket.id) {
                delete connectedUsers[userId];
                break;
            }
        }
    });
});
const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
