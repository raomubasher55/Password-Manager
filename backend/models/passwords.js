const mongoose =    require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    site:{
        type : String,
        required : true
    },
    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    }
})

const passwords =    mongoose.model("passwords" , userSchema)
module.exports = passwords;