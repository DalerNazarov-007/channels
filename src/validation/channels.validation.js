const Joi = require("joi")

const channelValid = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    type: Joi.string().valid("private", "public").required(),
    description: Joi.string().min(1).max(150).required(),
    ownerId: Joi.string().required(),
    createdAt: Joi.date().default(Date.now),
}).required()

const channelValidUpdate = Joi.object({
    title: Joi.string().min(1).max(500),
    type: Joi.string().min(1).max(500),
    description: Joi.string().min(1).max(150),
    ownerId: Joi.string(),
})
module.exports = { channelValid, channelValidUpdate}