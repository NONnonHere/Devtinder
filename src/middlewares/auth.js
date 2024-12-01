const adminAuth = (req,res,next) => {
    const token = "ye";
    const isAuthorized = token === "yet";
    if(!isAuthorized){
        res.status(401).send("Unauthorized access denied");
    }
    else 
    next();
};

module.exports = {
    adminAuth,
};