var express = require('express');
var cors = require('cors');
require('dotenv').config();
var mongodb = require('mongodb').MongoClient;
// let datastring = "mongodb://localhost:27017/"
const datastring = process.env.DB_URL;
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/home',(req,res)=>{
    mongodb.connect(datastring).then(objectClient=>{
        let dabase = objectClient.db('e-com');
        dabase.collection('product').find().toArray({}).then((document)=>{
            res.send(document);
            res.end();
        })
    })
});

app.listen(PORT,()=>{
    console.log(`Server is Start... http://127.0.0.1:${PORT}`)
});

