const express = require("express");
const mongoose = require("mongoose");

const PORT = 4000;

const routerFile = require("./routes/file");

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(routerFile);
mongoose.connect("mongodb://localhost:27017/filesharingapp")
.then(()=>console.log("server is connected to DB"))
.catch((err)=>console.log("Error while connecting database", err));

server.listen(PORT,()=>{

    console.log("SERVER IS RUNNING ON PORT", PORT);

})

