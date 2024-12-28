

const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors());


const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://vibhakar06:ZmOslY8kHB7nNisu@messagesapp.8uzsvmm.mongodb.net/?retryWrites=true&w=majority&appName=MessagesApp")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("not connected to database");
  });

app.get("/", (req, res) => {
  res.send("Welcome to the API. Use /getusers to get the list of users.");
});



app.listen(4000, () => {
  console.log("Server started: http://localhost:5000");
});