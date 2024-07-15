import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

// app.post for login

// app.get for employees list (employees/:name)

// app.get for employee (employee/:id)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});