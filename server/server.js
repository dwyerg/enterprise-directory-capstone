import express from 'express';
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
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        const collection = db.collection('users');
        const user = await collection.findOne({ username, password });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

// app.get endpoint for fetching employee details by ID
app.get('/employee/:id', async (req, res) => {
    const { id } = req.params;
    const userRole = req.headers['userrole'];
    const userId = req.headers['userid'];

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employee = await collection.findOne({ _id: id });

        console.log('Employee ID:', employee._id.toString());
        console.log('User ID:', userId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Check user role and permissions before sending employee details
        if (userRole === 'hr') {
            // HR can see everyone's details, including salary
            return res.json(employee);
        } else if (userRole === 'manager') {
            // Manager can see their own employees' details, including salary
            if (employee.manager_id === userId) {
                return res.json(employee);
            } else {
                // Manager can't see other employees' salaries
                return res.json({
                    ...employee,
                    salary: undefined // Hide salary for other employees
                });
            }
        } else { // Assuming 'employee' role
            // Employee can only see their own details, including salary
            if (employee._id.toString() === userId) {
                return res.json(employee);
            } else {
                // Employee can't see other employees' salaries
                return res.json({
                    ...employee,
                    salary: undefined // Hide salary for other employees
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// app.get for managers to view their employees
app.get('/employees', async (req, res) => {
    const { managerId } = req.query;

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        const employees = await collection.find({ manager_id: managerId }).toArray();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//app.get to return all employees for HR
app.get('/all-employees', async (req, res) => {

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        const employees = await collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});