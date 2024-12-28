const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First Name is required!"],
        
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum:["ADMIN","DOCTOR","PATIENT"],
    },
    gender:{
        type: String,
        required: true,
        enum:["M","F","O"],
    },
    doctorDepartment:{
        type: String,
        required: false,
    },
    uid:{
        type: String,
        required: false,
    },
    docAvtar:{
        type: String,
        required: false,
    },
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;