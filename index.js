const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//midlleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9votr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//
async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("geniusCar").collection("service");

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Genius Car Service Server is Running succesfully');
});

app.listen(port, () => {
    console.log('Genius Car Server is running on port', port);
})