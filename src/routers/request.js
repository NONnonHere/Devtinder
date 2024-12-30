const express = require("express");
const requestRouter = express.Router();

const userAuth = require('../middlewares/auth');
const  ConnectionRequest = require("../models/connectionRequest");

const User = require("../models/user");
const { connect } = require("mongoose");

requestRouter.post("/request/send/:status/:toUserId" , userAuth , async (req , res) => {
    
    try{   
        const status = req.params.status;
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id;
        const allowedStatus = ["ignored", "interested"];

        if(!allowedStatus.includes(status)){   
            return res.status(400).json({message : "Invalid status" , status : 400});
        }

        const toUserIdValid = await User.findById(toUserId);
        if(!toUserIdValid){
            return res.status(400).json({message : "Invalid user id"});
        }

        
        
        
        const existingConnectionRequest  = await ConnectionRequest.findOne({
            $or : [
                
                    {fromUserId, toUserId},
                    { fromUserId : toUserId , toUserId : fromUserId},
                
            ],
        });
        
        if(existingConnectionRequest){
                return res.status(400).json({message : "Connection request already sent"});
            }
       
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
            return res.status(400).json({message : "You can't send request to yourself"});
        }


        const data  =  await connectionRequest.save();

        if(status=== "ignored"){ 
            res.json({message : req.user.firstName + " has ignored " + toUserIdValid.firstName 

            });
        }
        else 
            res.json({
            message :  req.user.firstName + " is Interested in " + toUserIdValid.firstName ,
        });
        }
        catch(error){
            console.log(error);
    }

});

requestRouter.post("/request/review/:status/:requestId", userAuth , async (req,res) => {
    try{const {status, requestId} = req.params;
    const userIdlogined = req.user._id;
    const allowedStatusAR = ["accepted", "rejected"];
    
    if(!allowedStatusAR.includes(status)){
        return res.status(400).json({message : "Invalid status" , status : 400});
    }
    
    
    const connectionRequest = await ConnectionRequest.findOne({
        _id : requestId ,
        toUserId : userIdlogined ,
        status : "interested"
        
    });

    if(!connectionRequest){
        return res
        .status(400)
        .json({message : "Connection request not found" , status : 400});
    }
    connectionRequest.status = status;

    const data =  await connectionRequest.save();
    res.json({
        message : "Connection Request " + status,data 
    });
    }

    catch(error){
        res.status(400).send("ERROR" + error.message);
    }
});

module.exports = {
    requestRouter
};