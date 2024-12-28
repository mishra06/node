PORT = 4000;
const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors")

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());

mongoose
.connect(process.env.MONGO_URI)
 .then(() => console.log("Database connected succesfully"))
  .catch((err)=> console.log(`Error in DB connection ${err}`));
 
  
server.use("/api/v1/user",userRoutes);

server.use(errorHandler.errorHandler);

server.listen(PORT,()=>{
    console.log("Server is running on port" + PORT);
})

