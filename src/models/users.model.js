const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    surname: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    username:{
        type: String,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 20
    },
    email: {
        type: String,
        min: 5,
        max: 20
    },      
}, 
    {
        timestamps: true,
    }    
)

const userModel = mongoose.model("User", userSchema)
module.exports = userModel