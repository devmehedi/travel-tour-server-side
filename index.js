const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fxgoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('travelador-Featured');
        const productsCollection = database.collection('features');

        //GET PRODUCTS API
        app.get('/features', async (req, res) => {
            const cursor = featuresCollection.find({});
            const features = await cursor.toArray();
            res.send(features);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

//GET API
app.get('/', (req, res) => {
    res.send("Travelador ticket booking is running");
})

app.listen(port, () => {
    console.log('Server is running', port);
})