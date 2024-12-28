const UserModel = require("../models/user");

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const errorHandler = require("../middlewares/errorHandler");

const addNewAdminFunction = async (req,res)=>{
    // const 

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const user = {
        ...req.body,
         password:  hash,
         role: "ADMIN",
    };

   await UserModel.create(user);
    res.json({
        success:true,
        message:"Add new admin successfully",
    });
};

const addNewDoctorApiFun= async (req,res)=>{
    

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    const user = {
        ...req.body,
         password:  hash,
         role: "DOCTOR",
    };

   await UserModel.create(user);
    res.json({
        success:true,
        message:"Doctor registration successfully",
    });
};

const loginUserApiFunc = async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password",
        });
    }
    const isMatch = bcrypt.compareSync(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password",
        });
    }
    const jwtPayload = {
        role : user.role,
        userId : user._id,
        email :user.email,
        exp : new Date().getTime() + 3600*5000, // set jwt token expire time  5_hur
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);
    res.json({
        success:true,
        message:"Login successfully",
        token,
    });
}

const userController = {
    addNewAdmin: errorHandler.catchAsync(addNewAdminFunction),
    addNewDoctor: errorHandler.catchAsync(addNewDoctorApiFun),
    loginUser: errorHandler.catchAsync(loginUserApiFunc),
};

module.exports = userController;