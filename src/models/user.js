const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt  = require("jsonwebtoken");

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
            unique: true,
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

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({_id: user._id}, "Tanmayhere#22", {
        expiresIn: "1d",
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const hashedPassword = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword);

    return isPasswordValid;
}



userSchema.methods.generatePasswordReset = function() { this.resetPasswordToken = jwt.sign({ _id: this._id }, 
    'secret', 
    { expiresIn: '1h' }); 
    this.resetPasswordExpires = Date.now() + 3600000;
}
const User = mongoose.model("User", userSchema);

module.exports = User ; 