const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://NONnonhere:b2hdzCttsz1CUKSB@main0.thm0p.mongodb.net/Main"
    );
};


module.exports = ( connectDB);
