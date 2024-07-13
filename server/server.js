import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

// app.post for login

// app.post for search employees based on name (employees/:name)

app.post('/search', async (req, res) => {
    const { searchTerm } = req.body;

    try {
        // Connect to DB
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const results = await collection.find({ name: searchTerm }).toArray();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// app.get for employee (employee/:id)
app.get('/employee/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = db.collection('employees');
        const result = await collection.findOne({ _id: ObjectId(id) });

        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});