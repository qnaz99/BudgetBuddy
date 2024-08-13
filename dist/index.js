"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://qareebnazimudeen:2hV5UflFaOorrQK8@cluster0.qkyvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const app = (0, express_1.default)();
const port = 3000;
app.get('/login', async (req, res) => {
    const name = req.query.name;
    const password = req.query.password;
    if (name && password) {
        try {
            const user = await client.db('BudgetBuddy').collection('User').findOne({ name, password });
            if (user) {
                console.log(user._name);
                res.send("Succesfully authenticated, id: " + user._id);
            }
            else {
                res.status(404).send('Invalid name or password');
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error'); // Send a 500 error if there's an issue with the database query
        }
    }
});
app.get('/user', async (req, res) => {
    const id = req.query._id;
    if (id !== undefined) {
        try {
            // Ensure you replace 'databaseName' with your actual database name
            const user = await client.db('BudgetBuddy').collection('User').findOne({ _id: new ObjectId(id) });
            if (user) {
                console.log(user);
                res.json(user); // Send the user data as a JSON response
            }
            else {
                res.status(404).send('User not found'); // Send a 404 if the user is not found
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error'); // Send a 500 error if there's an issue with the database query
        }
    }
    else {
        res.send('Hello World!');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('BudgetBuddy');
//     // const collections = await database.createCollection('Expense');
//     // console.log(collections);
//     const expenses = database.collection('Expense');
//     const query = { userId: '', createdAt: new Date(), password: "qareeb123" };
//     // const user = await users.insertOne(query);
//     // console.log(user);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
