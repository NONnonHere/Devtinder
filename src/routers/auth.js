const express = require("express");
const authRouter = express();

const bcrypt = require('bcrypt');
const cookieParser  =  require("cookie-parser");
const jwt  = require("jsonwebtoken");


const User = require("../models/user"); 

authRouter.post("/signup", async (req,res) => {

    try{
        validteSignUpData(req);

        const {password, emailId, firstName, lastName} = req.body;

        const passwordHash = await bcrypt.hash(password,10);
       
    
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        }); 
        
        await user.save();
        res.send("User Added Successfully");
        
    }
    catch(err){
        res.status(400).send("Error Occurred " +err.message);
    }
    

});

authRouter.post("/login", async (req, res) => {
        try {
            const {emailId,password} = req.body;

            const user = await User.findOne({ emailId: emailId});

            if(!user){
                throw new Error("Invalid Email");
            }
            const isPasswordValid = await user.validatePassword(password);
            if(isPasswordValid){
                const token = await user.getJWT();

                res.cookie("token", token, {
                    expires: new Date(Date.now() + 8*3600000),
                });
                res.send("Login Successfull");
            }
            else {
                res.send("Invalid Credentials");
            }
        } catch (error) {
            res.status(400).send("Error " + error.message);
            
        }
});




authRouter.post("/logout", async (req, res) => {
    res
        .cookie("token", null, {
        expires: new Date(Date.now()),
        })
        .send("Logout Successfully");

});


module.exports = {
    authRouter
};