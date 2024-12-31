const express = require("express");

const connectDB  = require("./config/database.js");
const app = express();



const User = require("./models/user.js"); 
const {validteSignUpData} = require("./utils/validation.js");
const bcrypt = require('bcrypt');
const cookieParser  =  require("cookie-parser");
const jwt  = require("jsonwebtoken");

const { userAuth} = require("./middlewares/auth.js");


const {authRouter} = require("./routers/auth.js");
const {profileRouter} =  require("./routers/profile.js");
const {PasswordRouter} = require("./routers/forgotPassword.js");
const {requestRouter} = require("./routers/request.js");
const {userRouter} = require("./routers/user.js");


app.use(cookieParser());
app.use(express.json());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",PasswordRouter);
app.use("/", requestRouter);
app.use("/", userRouter);





// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId; 

//     try {
//         const user = await User.findOne({emailId: userEmail});
//         if(user.length === 0){
//             res.status(404).send("User Not Found");
//         }

//         res.send(user);
//     }
//     catch (err) {
//         res.status(400).send("Something went wrong");

//     }
// });

// app.get("/fee", async (req, res) => {
   

//     try {
//         const user = await User.find({});
//         res.send(user);
//     }
//     catch (err) {
//         res.status(400).send("Something went wrong");

//     }
// });

// app.patch("/update", async (req, res) => {


    

//     try {
        
//         const userId = req.body.userId;
//         const data = req.body;

//         const ALLOWED_UPDATES = [
//         "firstName","lastName","Gender","userId"
//         ];
//         const isAllowedData = Object.keys(data).every((k) =>
//             ALLOWED_UPDATES.includes(k)
//         );

        // if(!isAllowedData){
        //     throw new Error("Update not Allowed");
        // }
        // if(data.skills){
        //     if(data?.skills.length>10){
        //         throw new Error("Skills cannot be more than 10");
        //     }
        // }
        

        // const user = await User.findByIdAndUpdate(userId, data, { 
        //     new: true, 
        //     runValidators: true,
        // });
        // if (!user) {
        //     return res.status(404).send("User  not found");
        // }
        // res.send("User  Updated Successfully");
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Something went Wrong " + err.message);
//     }
// });


connectDB().then(() =>{
    console.log("Connection established");
    app.listen(7777 , () => {
        console.log("successfully running 7777")
    });
})
.catch((err) => {
    console.log("cannot establish connection");
});


