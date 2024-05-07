const mongoose = require("mongoose");
const mongooseURL = "mongodb://localhost:27017/Password";

const connectToMongo = () => {
    mongoose.connect(mongooseURL)
        .then(() => {
            console.log("Connecting to  To MongoDB Successfully")
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB", error);
        });
};

module.exports = connectToMongo