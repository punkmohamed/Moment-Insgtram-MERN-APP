import mongoose from "mongoose";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve the MongoDB URI from the environment variables
const dbURI = process.env.MONGODB_URI;

const db = mongoose.connect(dbURI)
    .then((() => {
        console.log("itworks")
        mongoose.connection.close();
    }))
    .catch((error) => console.log(error))
export default db;