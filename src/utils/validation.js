const validator = require('validator');

const validteSignUpData = (req) => {
    const {firstName,LastName,emailId,password} = req.body;
    if(!firstName || !emailId || !password){
        throw new Error('Please fill all the fields');
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter a valid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong Password ");
    }
}

module.exports = {validteSignUpData};