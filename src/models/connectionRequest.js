const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt  = require("jsonwebtoken");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
    }, 
    status : {
        type : String,
        enum : {    
            values : ["ignored", "accepted", "interested", "rejected"],
            messsage : '{value} is not valid status type',
            },
        }
    },
    {
    timestamps : true 
    }
);


// connectionRequestSchema.pre("save",  function(){
//     const connectionRequest = this;
//     if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
//         throw new Error("You can't send a connection request to yourself");
//     }
//     next();
// });


const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;