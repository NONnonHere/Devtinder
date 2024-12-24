const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            // required: true,

        },
        emailId: {
            type: String,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Address "+ value);
                }
            }    
            
            // required: true,
        },
        password: {
            type: String,
            // required: true,
        },
        Gender:{
            type: String,
            // required: true,
            validate(value){
                if(!["others","male","female"].includes(value )){
                    throw new Error("Gender data is not valid ");
                }
            },
        },
        age: {
    
            type: Number,
            // required: true,
        },
        skills: {
            type: Array,
        }
    },
{
    timestamps:true,
}


);


module.exports = mongoose.model("User", userSchema);