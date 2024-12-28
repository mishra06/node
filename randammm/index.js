// const express = require('express');;
// const app = express();
// const PORT = 4000;

// const mongoose = require('mongoose');

// mongoose
//   .connect("mongodb+srv://vibhakar06:ZmOslY8kHB7nNisu@messagesapp.8uzsvmm.mongodb.net/?retryWrites=true&w=majority&appName=MessagesApp")
//   .then(() => {
//     console.log("connected to database");
//   })
//   .catch((err) => {
//     console.log("not connected to database");
//   });

// app.get("/", (req, res) => {
//     res.send("Welcome to the API. Use /getusers to get the list of users.");
// });


// app.listen(PORT,(req,res)=>{
//     console.log(`Server is running on port ${PORT}`);
// })


const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 4000;

const uri = "mongodb+srv://vibhakar06:ZmOslY8kHB7nNisu@messagesapp.8uzsvmm.mongodb.net/?retryWrites=true&w=majority&appName=MessagesApp";
const client = new MongoClient(uri, { });

client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  app.get("/", (req, res) => {
    res.send("Welcome to the API. Use /getusers to get the list of users.");
  });

  app.get("/getusers", async (req, res) => {
    try {
      const db = client.db();
      const collection = db.collection('users');

      const users = await collection.find({}).toArray();
      res.json(users);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send('Error retrieving users');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

});