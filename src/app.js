const express = require("express");

const app = express();

const { adminAuth} = require("./middlewares/auth.js");
  
app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
    res.send("Data");
});

app.get("/admin/DeleteData", (req, res) => {
        res.send("Deleted User");

});
app.listen(7777 , () => {
    console.log("successfully running 7777")
});