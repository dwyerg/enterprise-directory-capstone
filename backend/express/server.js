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

app.post('/api/predict', (req, res) => {
    try {
        // Extract 'role' and 'location' from request body
        const { role, location } = req.body;

        // Example: Validate input
        if (!role || !location) {
            return res.status(400).json({ error: 'Role and location are required' });
        }

        // Example: Save to database or process data
        // Replace with your logic
        // const job = await Job.create({ role, location });
        
        const job = { role, location }; // Example: Dummy response
        
        res.status(201).json(job); // Respond with created status and job object
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});