const { forbidden } = require("joi");
const { Schema, default: mongoose } = require("mongoose");

const channelSchema = new Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    type: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 150
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        forbidden: true
    },     
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
 }],
},

    {
        timestamps: true,
    }    
)

const channelModel = mongoose.model("Channel", channelSchema)
module.exports = channelModel