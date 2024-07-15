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

// Middleware to validate user role and ID
const validateUser = (req, res, next) => {
    const { UserRole, UserId } = req.headers;

    if (!UserRole || !UserId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // You can add additional logic to validate user permissions here
    // For example, check if the user has the right permissions to access employee data

    req.user = { role: UserRole, _id: UserId }; // Attach user role and ID to request object
    next();
};


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

// app.post('/search', async (req, res) => {
//     const { searchTerm } = req.body;
//     const userRole = req.user.role; // Assuming user role is passed from Redux or session

//     try {
//         // Connect to DB (use your MongoDB setup)
//         const client = await MongoClient.connect(url);
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         let query = {}; // Default query
        
//         // Adjust query based on user role
//         if (userRole === 'hr') {
//             query = { $or: [{ name: searchTerm }, { username: searchTerm }] }; // HR can search by name or username
//         } else if (userRole === 'manager') {
//             query = { $and: [{ manager_id: req.user._id.toString() }, { name: searchTerm }] }; // Manager can search by name of their employees
//         } else { // Assuming 'employee' role
//             query = { $and: [{ _id: req.user._id.toString() }, { name: searchTerm }] }; // Employee can only search their own record
//         }

//         const results = await collection.find(query).toArray();
//         res.json(results);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });



// app.get for employee (employee/:id)
app.get('/employee/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const dbId = id.toString();

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        const collection = db.collection(collectionName);
        const result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Middleware to validate user role before accessing employee details
// GET endpoint for fetching employee details by ID
// app.get('/employee/:id', validateUser, async (req, res) => {
//     const { id } = req.params;

//     try {
//         const client = await MongoClient.connect(url);
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const employee = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         // Check user role and permissions before sending employee details
//         if (req.user.role === 'hr') {
//             // HR can see everyone's details, including salary
//             return res.json(employee);
//         } else if (req.user.role === 'manager') {
//             // Manager can see their own employees' details, including salary
//             if (employee.manager_id === req.user._id.toString()) {
//                 return res.json(employee);
//             } else {
//                 // Manager can't see other employees' salaries
//                 return res.json({
//                     ...employee,
//                     salary: undefined // Hide salary for other employees
//                 });
//             }
//         } else { // Assuming 'employee' role
//             // Employee can only see their own details, without their salary
//             if (employee._id.toString() === req.user._id) {
//                 return res.json({
//                     ...employee,
//                     salary: undefined // Hide salary for own details
//                 });
//             } else {
//                 return res.status(403).json({ message: 'Unauthorized to access this resource' });
//             }
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // GET endpoint for fetching employee details by ID
// app.get('/employee/:id', validateUser, async (req, res) => {
//     const { id } = req.params;

//     try {
//         const client = await MongoClient.connect(url);
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
        
//         const employee = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         // Determine if the user can access salary information
//         let canAccessSalary = false;
//         if (req.user.role === 'hr') {
//             canAccessSalary = true; // HR can see everyone's details, including salary
//         } else if (req.user.role === 'manager') {
//             if (employee.manager_id === req.user._id.toString()) {
//                 canAccessSalary = true; // Manager can see their own employees' details, including salary
//             }
//         }

//         // Prepare response based on role and access to salary
//         let responseEmployee = { ...employee };
//         if (!canAccessSalary) {
//             delete responseEmployee.salary; // Hide salary if not authorized
//         }

//         res.json(responseEmployee);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});