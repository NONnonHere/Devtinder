const express = require("express");
const profileRouter = express.Router();

const bcrypt = require('bcrypt');
const cookieParser  =  require("cookie-parser");
const jwt  = require("jsonwebtoken");
const userAuth = require("../middlewares/auth");
const User = require("../models/user"); 

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
    
    const user = req.user;

    res.send(user);
    
}

    catch(err){
        res.status(401).send("Unauthorized");
    }

    
});


profileRouter.patch("/profile/update", userAuth, async (req,res) => {
    try {

        const userId = req.user._id;
        const data = req.body;

        ALLOWED_UPDATES = ["firstName", "lastName", "gender", "age", "skills"];

        const isAllowedData = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if(!isAllowedData){
            throw new Error("Update not Allowed");
        }
        if(data.skills){
            if(data?.skills.length>10){
                throw new Error("Skills cannot be more than 10");
            }
        }
        

        const user = await User.findByIdAndUpdate(userId, data, { 
            new: true, 
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send("User  not found");
        }
        res.send("User  Updated Successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong " + err.message);
    }
});
       
module.exports = {
    profileRouter
};