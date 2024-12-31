const express = require("express");
const userRouter = express.Router();

const userAuth = require('../middlewares/auth');
const  ConnectionRequest = require("../models/connectionRequest");

const User = require("../models/user");



userRouter.get("/user/request/received", userAuth , async (req , res) => {
    try{const loginnedUser = req.user._id;

    const recievedRequests = await ConnectionRequest.find({
        toUserId : loginnedUser,
        status : "interested"
    }).populate("fromUserId", ["firstName", "lastName", "emailId"]);

    const data = recievedRequests.map((row) => row.fromUserId);

    res.json({
        message : "Received requests",
        data : data
    });}

    catch(err){
        res.status(400).send("Something went wrong " + err.message);
    }
});

userRouter.get("/user/donnections", userAuth , async (req , res) => {
    try{const loginnedUser = req.user._id;

    const connections = await ConnectionRequest.find({
        $or : [
            {toUserId : loginnedUser, status : "accepted"},
            {fromUserId : loginnedUser, status : "accepted"}
        ]
    }).populate("fromUserId", ["firstName", "lastName", "emailId"]).populate("toUserId", ["firstName", "lastName", "emailId"]);

    const data = connections.map((row) => {
        if(row.fromUserId._id.equals(loginnedUser)){
            return row.toUserId;
        } else {
            return row.fromUserId;
        }
    });

    res.json({
        message : "Connections",
        data : data
    });}

    catch(err){
        res.status(400).send("Something went wrong " + err.message);
    }
});

module.exports = {
    userRouter
};