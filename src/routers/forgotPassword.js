const express = require('express'); 
const PasswordRouter = express.Router(); 
const User = require('../models/user');
const userAuth = require('../middlewares/auth');
const cookieParser  =  require("cookie-parser");
const bcrypt = require('bcrypt');
const validator = require('validator');



PasswordRouter.post("/resetPassword", userAuth , async (req,res) => {
    try {const { enteredpassword, newPassword } = req.body;
    const oldPassword = req.user.password;
    
    
    if (!validator.isStrongPassword(newPassword)) {
        throw new Error("Enter a Strong Password");
    } else {
        const isPasswordValid = await bcrypt.compare(enteredpassword, oldPassword);
        
        if (isPasswordValid) {
            const passwordHash = await bcrypt.hash(newPassword, 10);
            req.user.password = passwordHash;
            await req.user.save();
            
            res.send("Password changed successfully"); 
            
        } else {
            res.send("Password doesn't match");
        }
    }}

    catch(err){
        res.status(400).send("Something went wrong " + err.message);
    }
});



module.exports = {
    PasswordRouter
};