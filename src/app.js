const express = require("express");

const connectDB  = require("./config/database.js");
const app = express();



const User = require("./models/user.js"); 
const {validteSignUpData} = require("./utils/validation.js");
const bcrypt = require('bcrypt');
const cookieParser  =  require("cookie-parser");
const jwt  = require("jsonwebtoken");

const { userAuth} = require("./middlewares/auth.js");



app.use(cookieParser());
  
// app.use("/admin", userAuth);

// app.get("/admin/getData", (req, res) => {
//     res.send("Data");
// });  

// app.get("/admin/DeleteData", (req, res) => {
//         res.send("Deleted User");

// });

app.use(express.json());

app.post("/signup", async (req,res) => {

        try{
            validteSignUpData(req);

            const {password, emailId, firstName, lastName} = req.body;

            const passwordHash = await bcrypt.hash(password,10);
            console.log(passwordHash);
        
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

app.get("/profile", userAuth, async (req, res) => {
    try {
    const user = req.user;
    
    res.send(user);
    
}

    catch(err){
        res.status(401).send("Unauthorized");
    }

    
});

app.post("/login", async (req, res) => {
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
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId; 

    try {
        const user = await User.findOne({emailId: userEmail});
        if(user.length === 0){
            res.status(404).send("User Not Found");
        }

        res.send(user);
    }
    catch (err) {
        res.status(400).send("Something went wrong");

    }
});

app.get("/fee", async (req, res) => {
   

    try {
        const user = await User.find({});
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Something went wrong");

    }
});

app.patch("/update", async (req, res) => {


    

    try {
        
        const userId = req.body.userId;
        const data = req.body;

        const ALLOWED_UPDATES = [
        "firstName","lastName","Gender","userId"
        ];
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
    } catch (err) {
        console.error(err);
        res.status(400).send("Something went Wrong " + err.message);
    }
});


connectDB().then(() =>{
    console.log("Connection established");
    app.listen(7777 , () => {
        console.log("successfully running 7777")
    });
})
.catch((err) => {
    console.log("cannot establish connection");
});


