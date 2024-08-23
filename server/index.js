import express from 'express';
import cors from 'cors';

import postRoutes from './src/module/posts/posts.routes.js';
import userRouter from './src/module/user/user.routes.js';
import db from './db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Allowable origins for CORS
const allowedOrigins = [
    'https://moment-insgtram-mern.vercel.app',
    'https://moment-insgtram-mern-kfds711dg-punkmohameds-projects.vercel.app',
    // Add more allowed origins as needed
];

const corsOptions = {
    origin: (origin, callback) => {
        // Check if origin is in the allowed list or if it's a server-to-server request (no origin)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // Allows cookies to be sent with requests
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRouter);

// Database Connection
db;

// Default Route
app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}!`));
