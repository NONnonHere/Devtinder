const express = require("express");

const app = express();



app.use( "/te+st",(req,res) => {
    res.send("Hello lawda"); 
});

// app.use("/", (req,res) => {
//     res.send("Hello"); 
// });

app.get( "/user" ,(req,res) => {
    res.send({
        firstname: "Tanmay",
        lastname: "Ail"
    });
    
});

app.post ( "/user" ,(req,res) => {
    res.send("Data Successfully saved ");


})
app.listen(7777 , () => {
    console.log("successfully running 7777")
});