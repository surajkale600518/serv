var express = require("express");
var cors = require("cors");
require('dotenv').config();
var mongoClient = require("mongodb").MongoClient;
var conString = process.env.DB_URL;
const PORT = process.env.PORT || 7000;


var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true})); 
app.use(express.json());

app.get("/home", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database  = clientObject.db("e-com");
        database.collection("product").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.listen(PORT);
console.log(`server is start... http://127.0.0.1:7000`)