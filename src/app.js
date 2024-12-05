const express = require("express");

const connectDB  = require("./config/database.js");
const app = express();

const { adminAuth} = require("./middlewares/auth.js");

const User = require("./models/user.js");
  
app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
    res.send("Data");
});  

app.get("/admin/DeleteData", (req, res) => {
        res.send("Deleted User");

});

app.use(express.json());

app.post("/signup", async (req,res) => {
//create a new instance of the user model
    console.log(req.body);
    const user = new User(req.body);
    
    await user.save();
    res.send("User Added Successfully");
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


