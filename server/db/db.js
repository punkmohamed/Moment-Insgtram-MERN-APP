import mongoose from "mongoose";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve the MongoDB URI from the environment variables
const dbURI = process.env.MONGODB_URI;

const db = mongoose.connect("mongodb://localhost:27017/moment")
    .then((() => {
        console.log("itworks")
    }))
    .catch((error) => console.log(error))
export default db;