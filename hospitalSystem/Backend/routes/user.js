const express = require("express");

const userController = require("../controllers/user");
const passport = require("../middlewares/auth");
const authroizer = require("../middlewares/authroization");


const router = express.Router();

router.post("/admin/addnew",userController.addNewAdmin);

router.post("/doctor/addnew", passport.authenticate("jwt", { session: false }),
authroizer("ADMIN"),userController.addNewDoctor);

router.post("/login",userController.loginUser);  // for everyone login api

module.exports = router;