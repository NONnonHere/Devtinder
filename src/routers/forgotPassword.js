const express = require('express'); 
const PasswordRouter = express.Router(); 
const User = require('../models/user');
const userAuth = require('../middlewares/auth');
const cookieParser  =  require("cookie-parser");
const bcrypt = require('bcrypt');



PasswordRouter.post("/resetPassword", userAuth , async (req,res) =>{
    const {password, newPassword} = req.body;
    const oldPassword = req.user.password;
    
    const isPasswordValid = await bcrypt.compare(password, oldPassword);
    if(isPasswordValid){
        const passwordHash = await bcrypt.hash(newPassword,10);
        User.password = passwordHash;
        res.send("Password changed successfully"); 
        
    }
    else 
    res.send("Password doesn't match");
    const isPasswordValidagain = await bcrypt.compare(newPassword, User.password);


    
});


module.exports = {
    PasswordRouter
};