import express, {Request, Response } from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://qareebnazimudeen:2hV5UflFaOorrQK8@cluster0.qkyvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const app = express();
app.use(cors());
const port = 3000


app.get('/login', async(req, res) => {
    const name = req.query.name
    const password = req.query.password

    if(name && password){
        try {
            const user = await client.db('BudgetBuddy').collection('User').findOne({ name, password })
            
            if (user){
                console.log(user._name)
                res.send(user._id)
            }
            else {
                res.status(404).send('Invalid name or password')
            }
        }
        catch (err) {   
            console.log(err);
            res.status(500).send('Internal Server Error'); // Send a 500 error if there's an issue with the database query
        }
    }
    else {
        res.status(404).send('Invalid name or password')
    }
})

interface tQuery {
    _id : string | undefined
}

interface userRequest {
    query: tQuery
}

app.get('/user', async (req : userRequest, res) => {
    const id = req.query._id;
    if (id !== undefined) {
        try {
            const user = await client.db('BudgetBuddy').collection('User').findOne({ _id: new ObjectId(id) });
            
            if (user) {
                console.log(user);
                res.json(user); // Send the user data as a JSON response
            } else {
                res.status(404).send('User not found'); // Send a 404 if the user is not found
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error'); // Send a 500 error if there's an issue with the database query
        }
    } else {
        res.send('Hello World!');
    }
});

interface expenseRequest {
    params: { id?: string}
}

app.get('/transaction', async (req, res) => {
    console.log("got request")
    const userId = req.query.id
    if (userId != undefined){   
        const transactions = client.db('BudgetBuddy').collection('Transaction').find({ userId });
        if (transactions){
            const transactionsArray = await transactions.toArray();
            console.log(transactionsArray);
            res.send(transactionsArray)
        }
        else{
            res.status(500).send('Internal Server Error');

        }

    }
    else{
        res.status(500).send('Internal Server Error');

    }
})

  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
